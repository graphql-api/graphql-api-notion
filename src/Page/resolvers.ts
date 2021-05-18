import {
  NotionPropertyValue,
  NotionCreatePageParameters,
  NotionCreatePageResponse,
  NotionPage,
  PropertyType,
  ResolverMap
} from '../types'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { Client } from '@notionhq/client'

export const resolvers: ResolverMap = {
  PageParent: {
    __resolveType(obj) {
      switch (obj.object) {
        case 'page':
          return 'Page'
        case 'database':
          return 'Database'
        case 'workspace':
          return 'Workspace'
        default:
          return null
      }
    }
  },
  Page: {
    async parent(root: NotionPage, args, { dataSources: { notion } }) {
      switch (root.parent.type) {
        case 'database_id':
          return notion.databases.retrieve({
            database_id: root.parent.database_id
          })
        case 'page_id':
          return notion.pages.retrieve({ page_id: root.parent.page_id })
        case 'workspace':
          return { __typename: 'Workspace', object: 'workspace' }
      }
    },
    async properties(root: NotionPage, args) {
      if (root.properties) {
        return {
          edges: Object.entries(root.properties).map(([name, node]) => ({
            name,
            node
          }))
        }
      }
    },
    async content(root, args, { dataSources: { notion } }) {
      const response = await notion.blocks.children.list({
        block_id: root.id
      })
      return response.results
    }
  },
  Query: {
    async page(root, args, { dataSources: { notion } }) {
      const page: NotionPage = await notion.pages.retrieve({
        page_id: args.input.pageId
      })
      return page
    }
  },
  Mutation: {
    async createPage(
      root,
      {
        input: { parent: inputParent, properties: inputProperties }
      }: { input: CreatePageInput },
      { dataSources: { notion } }
    ) {
      const properties = transformPageProperties(inputProperties)
      if (!inputParent.database_id && !inputParent.page_id) return null
      const parent = {
        page_id: inputParent.page_id ?? '',
        database_id: inputParent.database_id ?? ''
      }
      const pageBlock = await notion.pages.create({ parent, properties })
      const page = await notion.pages.retrieve({ page_id: pageBlock.id })
      return page
    },
    async updatePageProperties(
      root,
      {
        input: { page_id, properties: inputProperties }
      }: { input: UpdatePagePropertiesInput },
      { dataSources: { notion } }
    ): Promise<NotionPage> {
      const properties = transformPageProperties(inputProperties)
      const page = await notion.pages.update({ page_id, properties })
      return page
    }
  }
}

const transformPageProperties = (
  inputProperties: PropertyEdgeInput[]
): NotionCreatePageInput['properties'] => {
  const properties = inputProperties.reduce(
    (prev, { name, node }) => ({ ...prev, [name]: node }),
    {}
  )
  return properties
}

type NotionCreatePageInput = NotionCreatePageParameters

type CreatePageInput = {
  parent: { page_id?: string; database_id?: string }
  properties: PropertyEdgeInput[]
}

type UpdatePagePropertiesInput = {
  page_id: string
  properties: PropertyEdgeInput[]
}

type PropertyEdgeInput = {
  name
  node: PropertyValueInput
}

type PropertyValueInput =
  | {
      title: RichTextInput[]
    }
  | {
      rich_text: RichTextInput[]
    }
  | {
      number: number
    }
  | {
      select: SelectInput
    }
  | {
      multi_select: SelectInput[]
      // # date
      // # formula
      // # relation
      // # rollup
      // # people
      // # files
      // # checkbox
      // # url
      // # email
      // # phone_number
    }

type RichTextInput = {
  text: { content: string }
}

type SelectInput = {
  select: { name: string }
}

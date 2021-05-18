import { ResolverMap } from '../types'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export const resolvers: ResolverMap = {
  Database: {
    async properties(root, args) {
      if (root.properties) {
        return {
          __typename: 'DatabasePropertiesConnection',
          edges: Object.entries(root.properties).map(([name, node]) => ({
            __typename: 'DatabasePropertyEdge',
            name,
            node
          }))
        }
      }
    },
    async entries(root, args, { dataSources: { notion } }) {
      const query = await notion.databases.query({ database_id: root.id })
      return {
        __typename: 'EntriesConnection',
        edges: query.results.map((node) => ({ __typename: 'EntryEdge', node }))
      }
    }
  },
  Query: {
    async database(root, args, { dataSources: { notion } }) {
      const database = await notion.databases.retrieve({
        database_id: args.input.databaseId
      })
      return database
    },
    async listDatabases(root, args, { dataSources: { notion } }) {
      const response = await notion.databases.list({
        start_cursor: args?.input?.startCursor,
        page_size: args?.input?.pageSize
      })
      return response?.results ?? []
    }
  },
  Select: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'select':
          return 'SelectConfiguration'
        case 'multi_select':
          return 'MultiSelectConfiguration'
        default:
          return null
      }
    }
  },
  SelectConfiguration: {
    options: (root) => root.select.options
  },
  MultipleSelectConfiguration: {
    options: (root) => root.multi_select.options
  },
  Configuration: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'title':
          return 'TitleConfiguration'
        case 'rich_text':
        case 'number':
        case 'select':
        case 'multi_select':
        case 'date':
        case 'people':
        case 'file':
        case 'checkbox':
        case 'url':
        case 'email':
        case 'phone_number':
        case 'formula':
        case 'relation':
        case 'rollup':
        case 'created_time':
        case 'created_by':
        case 'last_edited_time':
        case 'last_edited_by':
          return upperFirst(camelCase(obj.type)) + 'Configuration'
      }
    }
  }
}

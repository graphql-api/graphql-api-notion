import { upperFirst, merge, camelCase } from 'lodash'
import { resolvers as richTextResolvers } from '../RichText/resolvers'
import { ResolverMap, NotionPage } from '../types'

const resolveRelationConnection = async function relation(
  root,
  args,
  { dataSources: { notion } }
) {
  const listPages: Promise<NotionPage>[] = root.relation.map(({ id }) =>
    notion.pages.retrieve({ page_id: id })
  )
  const pages = await Promise.all(listPages)
  return { edges: pages.map((node) => ({ node })) }
}

export const resolvers: ResolverMap = {
  PropertyValue: {
    __resolveType(obj) {
      const typename = `${upperFirst(camelCase(obj.type))}PropertyValue`
      return typename
    }
  },
  PropertyValueElement: {
    __resolveType(obj) {
      const typename = `${upperFirst(camelCase(obj.type))}PropertyValueElement`
      return typename
    }
  },
  RelationPropertyValue: { relation: resolveRelationConnection },
  RelationPropertyValueElement: { relation: resolveRelationConnection }

  // PropertyContent: {
  //   content(root) {
  //     console.log('PropertyConetn', root, root.type && root[root.type])
  //     if (root.type && root?.[root.type]) {
  //       return root?.[root.type]
  //     }
  //   }
  // },

  // Property: {}
}

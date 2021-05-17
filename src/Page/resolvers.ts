import { ResolverMap } from '../types'

export const resolvers: ResolverMap = {
  Page: {
    async properties(root, args) {
      if (root.properties) {
        return Object.entries(root.properties).map(([name, content]) => ({
          name,
          content
        }))
      }
    }
  },
  Query: {
    async page(root, args, { dataSources: { notion } }) {
      const page = await notion.pages.retrieve({ page_id: args.input.pageId })
      return page
    }
  }
}

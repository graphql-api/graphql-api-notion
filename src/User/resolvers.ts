import { ResolverMap } from '../types'

export const resolvers: ResolverMap = {
  NotionUser: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'person':
          return 'NotionPerson'
        case 'bot':
          return 'NotionBot'
        default:
          return null
      }
    }
  },
  Query: {
    async notionUser(
      root,
      args: { input: { userId: string } },
      { dataSources: { notion } }
    ) {
      if (args.input.userId) {
        return notion.users.retrieve({ user_id: args.input.userId })
      }
      return null
    },
    async listNotionUsers(root, args, { dataSources: { notion } }) {
      const users = await notion.users.list(args)
      return users.results
    }
  }
}

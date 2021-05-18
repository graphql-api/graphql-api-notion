import { ResolverMap } from '../types'

export const resolvers: ResolverMap = {
  User: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'person':
          return 'Person'
        case 'bot':
          return 'Bot'
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
    async listUsers(root, args, { dataSources: { notion } }) {
      const users = await notion.users.list(args)
      return users.results
    }
  }
}

import { ResolverMap } from '../types'

export const resolvers: ResolverMap = {
  Database: {
    async content(root, args, { dataSources: { notion } }) {
      const query = await notion.databases.query({ database_id: root.id })
      console.log(query)
      return query.results
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
      const response = await notion.databases.list(args?.input)
      return response?.results ?? null
    }
  }
}

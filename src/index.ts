export { resolvers } from './resolvers'
export { typeDefs } from './typeDefs'
import { NotionDataSource } from './dataSource'

export const dataSourceParams: ConstructorParameters<
  typeof NotionDataSource
>[0] = {
  notion_token: process.env.NOTION_TOKEN
}

export { NotionDataSource }

import { gql } from 'graphql-tag'
import { enumDefs } from './enums'
import { scalarDefs } from './scalars'
import { typeDefs as blockDefs } from './Block/typeDefs'
import { typeDefs as databaseDefs } from './Database/typeDefs'
import { typeDefs as pageDefs } from './Page/typeDefs'
import { typeDefs as userDefs } from './User/typeDefs'

export const typeDefs = gql`
  interface ObjectNode {
    object: Object!
    id: ID!
  }

  interface TypeNode {
    type: Type
  }

  ${scalarDefs}
  ${enumDefs}
  ${blockDefs}
  ${databaseDefs}
  ${pageDefs}
  ${userDefs}

  type PaginatedList {
    object: Object!
    results: [ObjectNode]
    hasMore: Boolean
    next_cursor: String
  }

  type Query {
    search(input: SearchInput): PaginatedList
  }

  input SearchInput {
    query: String
    sort: String
    filter: String
  }
`

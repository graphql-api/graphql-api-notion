import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  type Page implements ObjectNode {
    object: Object!
    id: ID!
    created_time: String
    last_edited_time: String
    archived: Boolean
    properties: Property
  }

  extend type Query {
    page(input: PageInput): Page
  }

  input PageInput {
    pageId: String
  }
`

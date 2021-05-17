import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  type NotionPersonEmail {
    email: EmailAddress
  }

  type NotionPerson implements NotionUser & ObjectNode & TypeNode {
    object: Object!
    type: Type!
    id: ID!
    person: NotionPersonEmail
    name: String
    avatar_url: URL
  }

  type NotionBot implements NotionUser & ObjectNode {
    object: Object!
    type: Type!
    id: ID!
    name: String
    avatar_url: URL
  }

  interface NotionUser {
    object: Object!
    type: Type!
    id: ID!
    name: String
    avatar_url: URL
  }

  extend type Query {
    notionUser(input: NotioUserInput!): NotionUser
    listNotionUsers: [NotionUser]
  }

  input NotioUserInput {
    userId: String
  }
`

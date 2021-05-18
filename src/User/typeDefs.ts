import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  type PersonEmail {
    email: EmailAddress
  }

  type Person implements User & ObjectNode & TypeNode {
    object: Object!
    type: Type!
    id: ID!
    person: PersonEmail
    name: String
    avatar_url: URL
  }

  type Bot implements User & ObjectNode {
    object: Object!
    type: Type!
    id: ID!
    name: String
    avatar_url: URL
  }

  interface User {
    object: Object!
    type: Type!
    id: ID!
    name: String
    avatar_url: URL
  }

  extend type Query {
    notionUser(input: NotioUserInput!): User
    listUsers: [User]
  }

  input NotioUserInput {
    userId: String
  }
`

import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  enum NotionColor {
    default
    gray
    brown
    orange
    yellow
    green
    blue
    purple
    pink
    red
  }

  enum NotionBackgroundColor {
    gray_background
    brown_background
    orange_background
    yellow_background
    green_background
    blue_background
    purple_background
    pink_background
    red_background
  }

  type NotionAnnotation {
    bold: Boolean
    italic: Boolean
    strikethrough: Boolean
    underline: Boolean
    code: Boolean
    color: String
  }

  interface RichText {
    type: Type
    plain_text: String
    href: String
    annotations: NotionAnnotation
  }

  type NotionUrl implements TypeNode {
    type: Type
    url: String
  }

  type NotionText {
    content: String
    link: NotionUrl
  }

  type RichTextText implements RichText & TypeNode {
    type: Type
    plain_text: String
    href: String
    annotations: NotionAnnotation
    text: NotionText
  }

  type RichTextMention implements RichText & TypeNode {
    type: Type
    plain_text: String
    href: String
    annotations: NotionAnnotation
  }

  type RichTextEquationEquation {
    expression: String
  }

  type RichTextEquation implements RichText & TypeNode {
    type: Type
    plain_text: String
    href: String
    annotations: NotionAnnotation
    equation: RichTextEquationEquation
  }

  type Property {
    name: String
    content: TypeNode
  }

  type Database implements ObjectNode {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    title: [RichText]
    properties: Property
    content: [Page]
  }

  extend type Query {
    database(input: DatabaseInput!): Database
    listDatabases: [Database]
  }

  input DatabaseInput {
    databaseId: ID!
  }
`

import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  type Page implements ObjectNode & PageParent {
    object: Object!
    id: ID!
    created_time: DateTime
    last_edited_time: DateTime
    archived: Boolean
    properties: PagePropertiesConnection
    content: [Block]
    parent: PageParent
  }

  type PagePropertiesConnection {
    edges: [PagePropertyEdge]
  }

  type PagePropertyEdge {
    """
    key
    """
    name: String
    """
    value
    """
    node: PropertyValue
  }

  enum ParentType {
    page_id
    database_id
    workspace
  }

  interface PageParent {
    object: Object!
  }

  type Workspace implements PageParent {
    object: Object!
    isWorkspace: Boolean
  }

  extend type Query {
    page(input: PageInput): Page
  }

  input PageInput {
    pageId: String
  }

  extend type Mutation {
    createPage(input: CreatePageInput!): Page
    updatePageProperties(input: UpdatePagePropertiesInput!): Page
  }

  input CreatePageInput {
    """
    A database parent or page parent
    """
    parent: ParentInput!
    """
    Property values of this page. The keys are the names or IDs of the property and the values are property values.
    """
    properties: [PropertyEdgeInput!]!
    """
    Page content for the new page as an array of block objects
    """
    children: [CreateBlockInput]
  }

  input ParentInput {
    database_id: ID
    page_id: ID
  }

  input UpdatePagePropertiesInput {
    page_id: ID!
    properties: [PropertyEdgeInput!]!
  }
`

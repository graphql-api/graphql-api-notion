import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  extend type Query {
    listBlockChildren(input: ListBlockChildrenInput): [Block]
  }

  input ListBlockChildrenInput {
    blockId: ID!
  }

  interface Block {
    object: Object
    id: ID!
    createdTime: String
    last_edited_time: String
  }

  type ParagraphBlockParagraph {
    text: [RichText]
  }

  type ParagraphBlock implements Block & ObjectNode {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    paragraph: ParagraphBlockParagraph
    children: [Block]
  }

  type HeadingOneBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    text: [RichText]
    has_children: Boolean
  }

  type HeadingTwoBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    text: [RichText]
    has_children: Boolean
  }

  type HeadingThreeBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    text: [RichText]
    has_children: Boolean
  }

  type BulletedListItemBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    text: [RichText]
    children: [Block]
  }

  type NumberedListItemBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    text: [RichText]
    children: [Block]
  }

  type ToDoBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    text: [RichText]
    checked: Boolean
    children: [Block]
  }

  type ToggleBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    text: [RichText]
    children: [Block]
  }

  type ChildPageBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
    title: String
  }

  type UnsupportedBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: Type
  }
`

import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  extend type Query {
    listBlockChildren(input: ListBlockChildrenInput): [Block]
  }

  input ListBlockChildrenInput {
    blockId: ID!
  }

  input CreateBlockInput {
    type: BlockType
  }

  # Block type enum

  enum BlockType {
    paragraph
    heading_1
    heading_2
    heading_3
    bulleted_list_item
    numbered_list_item
    to_do
    toggle
    child_page
    unsupported
  }

  # Block interfaces

  interface Block {
    id: ID!
    object: Object
    type: BlockType
    createdTime: String
    last_edited_time: String
    has_children: Boolean
  }

  interface BlockWithChildren {
    object: Object
    id: ID!
    createdTime: String
    last_edited_time: String
    has_children: Boolean
    children: [Block]
  }

  interface BlockWithText {
    object: Object
    id: ID!
    createdTime: String
    last_edited_time: String
    has_children: Boolean
    text: [RichText]
  }

  # Block Types

  type Text {
    text: [RichText]
  }

  type ParagraphBlock implements Block & ObjectNode & BlockWithChildren {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: BlockType!
    text: [RichText]
    paragraph: Text
    has_children: Boolean
    children: [Block]
  }

  type HeadingOneBlock implements Block & ObjectNode & BlockWithText {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: BlockType!
    heading_1: Text
    text: [RichText]
    has_children: Boolean
  }

  type HeadingTwoBlock implements Block & ObjectNode & BlockWithText {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: BlockType!
    text: [RichText]
    heading_2: Text
    has_children: Boolean
  }

  type HeadingThreeBlock implements Block & ObjectNode & BlockWithText {
    object: Object!
    id: ID!
    type: BlockType!
    createdTime: String
    last_edited_time: String
    heading_3: Text
    text: [RichText]
    has_children: Boolean
  }

  type TextAndChildren {
    text: [RichText]
  }

  type BulletedListItemBlock implements Block & BlockWithChildren & BlockWithText {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: BlockType!
    bulleted_list_item: TextAndChildren
    text: [RichText]
    has_children: Boolean
    children: [Block]
  }

  type NumberedListItemBlock implements Block & BlockWithChildren & BlockWithText {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: BlockType!
    numbered_list_item: TextAndChildren
    text: [RichText]
    has_children: Boolean
    children: [Block]
  }

  type ToDo {
    text: [RichText]
    checked: Boolean
    children: [Block]
  }

  type ToDoBlock implements Block & BlockWithChildren & BlockWithText {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: BlockType!
    to_do: ToDo
    text: [RichText]
    checked: Boolean
    has_children: Boolean
    children: [Block]
  }

  type ToggleBlock implements Block & BlockWithChildren & BlockWithText {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: BlockType!
    toggle: TextAndChildren
    text: [RichText]
    has_children: Boolean
    children: [Block]
  }

  type ChildPage {
    title: String
  }

  type ChildPageBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    type: BlockType!
    child_page: ChildPage
    has_children: Boolean
    title: String
  }

  type UnsupportedBlock implements Block {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    has_children: Boolean
    type: BlockType!
  }
`

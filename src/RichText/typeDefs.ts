import { gql } from 'graphql-tag'

export const typeDefs = gql`
  input RichTextInput {
    text: NotionTextInput
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

  input NotionTextInput {
    content: String
  }

  type RichTextText implements RichText & TypeNode {
    """
    text
    """
    type: Type
    plain_text: String
    href: String
    annotations: NotionAnnotation
    text: NotionText
  }

  type RichTextMention implements RichText & TypeNode {
    type: Type!
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

  type NotionAnnotation {
    bold: Boolean
    italic: Boolean
    strikethrough: Boolean
    underline: Boolean
    code: Boolean
    color: String
  }
`

import { gql } from 'graphql-tag'

export const typeDefs = gql`
  input PropertyEdgeInput {
    """
    key
    """
    name: String
    """
    value
    """
    node: PropertyValueInput
  }

  input PropertyValueInput {
    title: [RichTextInput]
    rich_text: [RichTextInput]
    number: Float
    select: SelectInput
    multi_select: [SelectInput]
    date: String
    # formula
    # relation
    # rollup
    # people
    # files
    # checkbox
    # url
    # email
    # phone_number
  }

  interface PropertyValue {
    id: ID!
    type: PropertyValueType!
  }

  interface PropertyValueElement {
    type: PropertyValueType!
  }

  enum PropertyValueType {
    rich_text
    number
    select
    multi_select
    date
    formula
    relation
    rollup
    title
    people
    files
    checkbox
    url
    email
    phone_number
    created_time
    created_by
    last_edited_time
    last_edited_by
  }

  """
  Title property value objects contain an array of rich text objects within the title property.
  """
  type TitlePropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    title: [RichText]
  }

  type TitlePropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    title: [RichText]
  }

  input TitlePropertyInput {
    title: [RichTextInput]
  }

  """
  Rich Text property value objects contain an array of rich text objects within the rich_text property.
  """
  type RichTextPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    rich_text: [RichText]
  }

  type RichTextPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    rich_text: [RichText]
  }

  """
  Number property value objects contain a number within the number property.
  """
  type NumberPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    number: Float
  }

  type NumberPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    number: Float
  }
  """

  """
  type SelectPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    select: SelectOption
  }

  type SelectPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    select: SelectOption
  }

  input SelectPropertyInput {
    select: SelectInput
  }

  input SelectInput {
    name: String
  }

  """

  """
  type MultiSelectPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    multi_select: [SelectOption]
  }

  type MultiSelectPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    multi_select: [SelectOption]
  }

  type DateProperty {
    start: DateTime
    end: DateTime
  }

  type DatePropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    date: DateProperty
  }

  type DatePropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    date: DateProperty
  }

  """
  https://developers.notion.com/reference/page#formula-property-values
  Formula property value objects represent the result of evaluating a formula described in the
  database's properties. These objects contain a type key and a key corresponding with the value of type. The value is an object containing type-specific data. The type-specific data are described in the sections below.
  """
  interface FormulaPropertyValue {
    id: ID!
    type: FormulaPropertyValueType!
  }

  enum FormulaPropertyValueType {
    string
    number
    boolean
    date
  }

  """
  String formulaPropertyValue contain an optional string within the string property.
  """
  type StringFormulaPropertyValue implements FormulaPropertyValue {
    id: ID!
    type: FormulaPropertyValueType!
    string: String
  }

  type NumberFormulaPropertyValue implements FormulaPropertyValue {
    id: ID!
    type: FormulaPropertyValueType!
    number: Float
  }

  type BooleanFormulaPropertyValue implements FormulaPropertyValue {
    id: ID!
    type: FormulaPropertyValueType!
    boolean: Boolean
  }

  type DateFormulaPropertyValue implements FormulaPropertyValue {
    id: ID!
    type: FormulaPropertyValueType!
    date: DateTime
  }

  """
  Relation property value objects contain an array of page references within the relation property. A page reference is an object with an id property, with a string value (UUIDv4) corresponding to a page ID in another database.
  """
  type RelationPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    relation: RelationConnection
  }

  type RelationPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    relation: RelationConnection
  }

  type RelationConnection {
    edges: [RelationEdge]
  }

  type RelationEdge {
    node: Page
  }

  """
  Rollup property value objects represent the result of evaluating a rollup described in the
  database's properties. These objects contain a type key and a key corresponding with the value of type. The value is an object containing type-specific data. The type-specific data are described in the sections below.
  """
  type RollupPropertyValue {
    id: ID!
  }

  type NumberRollupPropertyValue {
    id: ID!
  }

  type DateRollupPropertyValue {
    id: ID!
  }

  """
  Array rollupPropertyValue contain an array of element objects within the array property.
  """
  type ArrayRollupPropertyValue {
    array: [RollupPropertyValueElement]
  }

  interface RollupPropertyValueElement {
    type: String
  }

  type PeoplePropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    people: [User]
  }

  type PeoplePropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    people: [User]
  }

  type FilesPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    files: [String]
  }

  type FilesPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    files: [String]
  }

  type CheckboxPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    checkbox: Boolean
  }

  type CheckboxPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    checkbox: Boolean
  }

  type URLPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    url: URL
  }

  type URLPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    url: URL
  }

  type EmailPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    email: EmailAddress
  }

  type EmailPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    email: EmailAddress
  }

  type PhoneNumberPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    phone_number: JSON
  }

  type PhoneNumberPropertyElement implements PropertyValueElement {
    type: PropertyValueType!
    phone_number: JSON
  }

  type CreatedTimePropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    created_time: DateTime
  }

  type CreatedTimePropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    created_time: DateTime
  }

  type CreatedByPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    created_by: User
  }

  type CreatedByPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    created_by: User
  }

  type LastEditedTimePropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    last_edited_time: DateTime
  }

  type LastEditedTimePropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    last_edited_time: DateTime
  }

  type LastEditedByPropertyValue implements PropertyValue {
    id: ID!
    type: PropertyValueType!
    last_edited_by: User
  }

  type LastEditedByPropertyValueElement implements PropertyValueElement {
    type: PropertyValueType!
    last_edited_by: User
  }
`

// type PropertyContent {
//   id: String
//   type: String
//   content: [TypeNode]
// }

// type PropertyNode {
//   name: String
//   type: String
//   property: PropertyContent
// }

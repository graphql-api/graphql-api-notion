import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  type Database implements ObjectNode {
    object: Object!
    id: ID!
    createdTime: String
    last_edited_time: String
    title: [RichText]
    properties: DatabasePropertiesConnection
    entries: EntriesConnection
  }

  type EntriesConnection {
    edges: [EntryEdge]
  }

  type EntryEdge {
    node: Page
  }

  extend type Query {
    database(input: DatabaseInput!): Database
    listDatabases(input: ListDatabasesInput): [Database]
  }

  input DatabaseInput {
    databaseId: ID!
  }

  input ListDatabasesInput {
    startCursor: String
    pageSize: Int
  }

  type DatabasePropertiesConnection {
    edges: [DatabasePropertyEdge]
  }

  type DatabasePropertyEdge {
    name: String
    node: Configuration
  }

  enum DataBasePropertyConfigurationType {
    title
    rich_text
    number
    select
    multi_select
    date
    people
    file
    checkbox
    url
    email
    phone_number
    formula
    relation
    rollup
    created_time
    created_by
    last_edited_time
    last_edited_by
  }

  enum NumberFormat {
    number
    number_with_commas
    percent
    dollar
    euro
    pound
    byen
    ruble
    rupee
    won
    yuan
  }

  interface Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
  }

  type TitleConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    title: JSON
  }

  """
  Text database property objects have no additional configuration within the rich_text property.
  """
  type TextConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    rich_text: RichText
  }

  """
  Number database property objects contain the following configuration within the number property:
  """
  type NumberConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    number: Number
  }

  type Number {
    format: NumberFormat
  }

  interface Select {
    options: [SelectOption]
  }

  """
  Select database property objects contain the following configuration within the select property:
  """
  type SelectConfiguration implements Configuration & Select {
    id: ID!
    type: DataBasePropertyConfigurationType!
    options: [SelectOption]
    select: SelectProperty
  }

  type SelectProperty {
    options: [SelectOption]
  }

  type SelectOption {
    """
    Name of the option as it appears in Notion.
    """
    name: String
    id: ID!
    color: NotionColor
  }

  type MultiSelectConfiguration implements Configuration & Select {
    id: ID!
    type: DataBasePropertyConfigurationType!
    multi_select: SelectProperty
    options: [SelectOption]
  }

  type DateConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    date: Date
  }

  type PeopleConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    people: JSON
  }

  type FileConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    file: JSON
  }

  type CheckboxConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    checkbox: JSON
  }

  type URLConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    url: JSON
  }

  type EmailConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    email: JSON
  }

  type PhoneNumberConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    phone_number: JSON
  }

  type FormulaConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    formula: Formula
  }

  type Formula {
    expression: String
  }

  """
  Relation database property objects contain the following configuration within the relation property:
  """
  type RelationConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    relation: Relation
  }

  type Relation {
    """
    The database this relation refers to. New linked pages must belong to this database in order to be valid.
    """
    database_id: ID!
    """
    By default, relations are formed as two synced properties across databases: if you make a change to one property, it updates the synced property at the same time. synced_property_name refers to the name of the property in the related database.
    """
    synced_property_name: String
    """
    By default, relations are formed as two synced properties across databases: if you make a change to one property, it updates the synced property at the same time. synced_property_id refers to the id of the property in the related database. This is usually a short string of random letters and symbols.
    """
    synced_property_id: String
    database: Database
  }

  """
  Rollup database property objects contain the following configuration within the rollup property:
  """
  type RollupConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    rollup: Rollup
  }

  type Rollup {
    relation_property_name: String
    relation_property_id: String
    rollup_property_name: String
    rollup_property_id: String
    function: String
  }

  enum RollupFunction {
    count_all
    count_values
    count_unique_values
    count_empty
    count_not_empty
    percent_empty
    percent_not_empty
    sum
    average
    median
    min
    max
    range
  }

  """
  Created time database property objects have no additional configuration within the created_time property.
  """
  type CreatedTimeConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    created_time: Time
  }

  """
  Created by database property objects have no additional configuration within the created_by property.
  """
  type CreatedByConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    created_by: JSON
  }

  """
  Last edited time database property objects have no additional configuration within the last_edited_time property.
  """
  type LastEditedTimeConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    last_edited_time: Time
  }

  """
  Last edited by database property objects have no additional configuration within the last_edited_by property.
  """
  type LastEditedByConfiguration implements Configuration {
    id: ID!
    type: DataBasePropertyConfigurationType!
    last_edited_by: JSON
  }
`

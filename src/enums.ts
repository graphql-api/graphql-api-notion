import { gql } from 'apollo-server-core'

export const enumDefs = gql`
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

  enum Object {
    list
    block
    page
    database
    user
    workspace
  }

  enum Type {
    paragraph
    heading_1
    heading_2
    heading_3
    bulleted_list_item
    numbered_list_item
    to_do
    toggle
    unsupported
    child_page
    database_id
    page_id
    workspace
    rich_text
    text
    boolean
    number
    formula
    multi_select
    select
    files
    array
    rollup
    date
    people
    checkbox
    email
    phone_number
    created_time
    created_by
    last_edited_time
    last_edited_by
    url
    mention
    user
    person
    bot
    page
    database
    equation
  }
`

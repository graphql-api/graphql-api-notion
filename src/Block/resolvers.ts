import { ResolverMap } from '../types'

export const resolvers: ResolverMap = {
  BulletedListItemBlock: {
    text: (root) => root.bulleted_list_item?.text,
    children: (root) => root.bulleted_list_item?.children
  },

  HeadingOneBlock: {
    text: (root) => root.heading_1.text
  },
  HeadingTwoBlock: {
    text: (root) => root.heading_2.text
  },
  HeadingThreeBlock: {
    text: (root) => root.heading_3.text
  },
  NumberedListItemBlock: {
    text: (root) => root.numbered_list_item?.text,
    children: (root) => root.numbered_list_item?.children
  },
  Paragraph: {
    text: (root) => root.paragraph?.text,
    children: (root) => root.paragraph?.children
  },
  ToDoBlock: {
    text: (root) => root.to_do?.text,
    checked: (root) => root.to_do.checked,
    children: (root) => root.to_do.children
  },
  ToggleBlock: {
    text: (root) => root.toggle.text,
    children: (root) => root.toggle.children
  },
  ChildPageBlock: {
    title: (root) => root.child_page.title
  },
  Block: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'paragraph':
          return 'ParagraphBlock'
        case 'heading_1':
          return 'HeadingOneBlock'
        case 'heading_2':
          return 'HeadingTwoBlock'
        case 'heading_3':
          return 'HeadingThreeBlock'
        case 'bulleted_list_item':
          return 'BulletedListItemBlock'
        case 'numbered_list_item':
          return 'NumberedListItemBlock'
        case 'to_do':
          return 'ToDoBlock'
        case 'toggle':
          return 'ToggleBlock'
        case 'child_page':
          return 'ChildPageBlock'
        case 'unsupported':
          return 'UnsupportedBlock'
        default:
          return null
      }
    }
  },
  Query: {
    async listBlockChildren(root, args, { dataSources: { notion } }) {
      const blockChildren = await notion.blocks.children.list({
        block_id: args.input.blockId
      })
      return blockChildren.results
    }
  }
}

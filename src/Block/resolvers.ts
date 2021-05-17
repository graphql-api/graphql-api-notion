import { ResolverMap } from '../types'

export const resolvers: ResolverMap = {
  RichText: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'text':
          return 'RichTextText'
        case 'mention':
          return 'RichTextMention'
        case 'equation':
          return 'RichTextEquation'
      }
    }
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

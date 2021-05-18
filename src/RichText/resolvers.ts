export const resolvers = {
  RichText: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'text':
          return 'RichTextText'
        case 'mention':
          return 'RichTextMention'
        case 'equation':
          return 'RichTextEquation'
        default:
          return null
      }
    }
  },
  
}

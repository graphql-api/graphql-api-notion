import { ResolverMap } from './types'
import { upperFirst, merge, camelCase } from 'lodash'
import { resolvers as scalarResolvers } from './scalars'
import { resolvers as blockResolvers } from './Block/resolvers'
import { resolvers as databaseResolvers } from './Database/resolvers'
import { resolvers as pageResolvers } from './Page/resolvers'
import { resolvers as userResolvers } from './User/resolvers'

export const resolvers: ResolverMap = merge(
  scalarResolvers,
  blockResolvers,
  databaseResolvers,
  pageResolvers,
  userResolvers,
  {
    ObjectNode: {
      __resolveType(obj) {
        return upperFirst(camelCase(obj.type))
      }
    },
    TypeNode: {
      __resolveType(obj) {
        return upperFirst(camelCase(obj.type))
      }
    },
    Query: {
      async search(root, args, { dataSources,  }) {
        const response = await dataSources.notion.search(args)
        return response
      }
    }
  } as ResolverMap
)

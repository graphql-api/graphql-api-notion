import { GraphQLResolverMap } from 'apollo-graphql'
import { Client } from '@notionhq/client'

export type ResolverMap = GraphQLResolverMap<{
  dataSources: { notion: Client }
}>

import { GraphQLResolverMap } from 'apollo-graphql'
import { Client } from '@notionhq/client'
import { Page, PropertyValue } from '@notionhq/client/build/src/api-types'
import {
  PagesCreateParameters,
  PagesCreateResponse
} from '@notionhq/client/build/src/api-endpoints'

export type ResolverMap = GraphQLResolverMap<{
  dataSources: { notion: Client }
}>

export { PropertyValue as NotionPropertyValue, Page as NotionPage }

export type PropertyType = PropertyValue['type']

export type NotionCreatePageParameters = PagesCreateParameters
export type NotionCreatePageResponse = PagesCreateResponse

import { gql } from 'graphql-tag'
import { GraphQLScalarType } from 'graphql'
import {
  URLTypeDefinition,
  URLResolver,
  EmailAddressTypeDefinition,
  EmailAddressResolver,
  JSONDefinition,
  JSONResolver,
  JSONObjectDefinition,
  JSONObjectResolver,
  DateResolver,
  DateTypeDefinition,
  TimeTypeDefinition,
  TimeResolver,
  DateTimeTypeDefinition,
  DateTimeResolver
} from 'graphql-scalars'
import { ResolverMap } from './types'

const PropertyScalar = new GraphQLScalarType({
  name: 'Property'
})

export const scalarDefs = gql`
  ${DateTimeTypeDefinition}
  ${DateTypeDefinition}
  ${TimeTypeDefinition}
  ${URLTypeDefinition}
  ${EmailAddressTypeDefinition}
  ${JSONDefinition}
  ${JSONObjectDefinition}
`

export const resolvers: ResolverMap = {
  DateTime: DateTimeResolver,
  Date: DateResolver,
  URL: URLResolver,
  EmailAdress: EmailAddressResolver,
  JSON: JSONResolver,
  JSONObject: JSONObjectResolver,
  Time: TimeResolver
}

import { gql } from 'graphql-tag'
import { GraphQLScalarType } from 'graphql'
import {
  URLTypeDefinition,
  URLResolver,
  EmailAddressTypeDefinition,
  EmailAddressResolver,
  JSONObjectDefinition,
  JSONObjectResolver
} from 'graphql-scalars'
import { ResolverMap } from './types'

const PropertyScalar = new GraphQLScalarType({
  name: 'Property'
})

export const scalarDefs = gql`
  ${URLTypeDefinition}
  ${EmailAddressTypeDefinition}
  ${JSONObjectDefinition}
`

export const resolvers: ResolverMap = {
  URL: URLResolver,
  EmailAdress: EmailAddressResolver,
  JSONObject: JSONObjectResolver
}

import { GraphQLSchema } from 'graphql'

import { RootQuery } from './queries/RootQuery'
import { Mutation } from './mutation/Mutation'

export const schema = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})
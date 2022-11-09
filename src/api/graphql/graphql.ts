import express from 'express';
import { graphqlHTTP } from 'express-graphql';
const routerGraphQL = express.Router();
//const express_graphql = require('express-graphql').graphqlHTTP;
//const { buildSchema } = require('graphql');
import {schema} from './schema';

routerGraphQL.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

export {routerGraphQL};
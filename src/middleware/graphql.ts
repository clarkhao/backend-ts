import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
const routerGraphQL = express.Router();
//const express_graphql = require('express-graphql').graphqlHTTP;
//const { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
const root = {
    message: () => 'Hello World!'
};
//
routerGraphQL.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

export {routerGraphQL};
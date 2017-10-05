import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
type Todo {
    id: ID!
    title: String
    description: String
    dueDate: String
    priority: String
  }
  
  type Query {
    todos: [Todo]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
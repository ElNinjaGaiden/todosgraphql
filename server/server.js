import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postgraphql from 'postgraphql';
import { clientUri, databaseConnectionString } from './src/config';

const PORT = 4000;
const server = express();

server.use('*', cors({ origin: clientUri }));
server.use(postgraphql(databaseConnectionString));

// server.use('/graphql', bodyParser.json(), graphqlExpress({
//     schema
// }));

server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
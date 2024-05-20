import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Config } from './config';

/**
 * @description holds apollo graphql client
 */

const token = localStorage.getItem('token')

const cache = new InMemoryCache({
  addTypename: false
});

const link = new HttpLink({
  uri: Config.GRAPHQL_URL,
  headers: {
    authorization: token?  `Bearer ${token}` : ""
  }
})

export const client = new ApolloClient({
  cache,
  link
})

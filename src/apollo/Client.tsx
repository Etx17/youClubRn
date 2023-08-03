import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React from 'react';
interface IClient {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: 'http://127.0.0.1:3000/graphql',
  cache: new InMemoryCache(),
});

const Client = ({children}: IClient) => {
    return (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    )
    };

export default Client;

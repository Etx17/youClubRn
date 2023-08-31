import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React from 'react';
interface IClient {
  children: React.ReactNode;
}

const client = new ApolloClient({
  // uri: 'http://127.0.0.1:3000/graphql',
  uri: 'https://youclubstaging-42da65c4b5e7.herokuapp.com/graphql', // to develop on staging environment
  cache: new InMemoryCache(),
});

const Client = ({children}: IClient) => {
    return (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    )
    };

export default Client;

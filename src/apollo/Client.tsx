import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React from 'react';
interface IClient {
  children: React.ReactNode;
}
const apiUrl = process.env.EXPO_PUBLIC_STAGING_URL;
const client = new ApolloClient({
  uri: 'http://127.0.0.1:3000/graphql', // to develop on local environment, change as well authentication in authContext to get the user you need to have.
  // uri: apiUrl, // to develop on staging environment
  cache: new InMemoryCache(),
});

const Client = ({children}: IClient) => {
    return (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    )
    };

export default Client;

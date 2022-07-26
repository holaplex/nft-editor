import React from 'react'
import { render } from "react-dom"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from './App'
import './index.css'


const client = new ApolloClient({
  uri: "https://graph.holaplex.com/v1",
  cache: new InMemoryCache()
});

const root = document.getElementById("root");
render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>, root
);

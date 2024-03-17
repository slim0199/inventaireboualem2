import { ApolloClient, InMemoryCache } from "@apollo/client"
import withApollo from "next-with-apollo"
import { createHttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = process.env.NEXT_PUBLIC_API_URL

const link = createHttpLink({
  fetch,
  uri: `${process.env.NEXT_PUBLIC_graphqlAPI}`,
})

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: link,
      cache: new InMemoryCache().restore(initialState || {}),
    })
)

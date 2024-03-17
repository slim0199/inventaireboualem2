// /lib/apollo.ts
import { ApolloClient, InMemoryCache } from "@apollo/client"

const apolloClient = new ApolloClient({
  uri: "https://strapi-bilblog-eu.herokuapp.com/graphql",
  cache: new InMemoryCache(),
})

export default apolloClient

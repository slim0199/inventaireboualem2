import { useRouter } from "next/router"
import { React } from "react"
import CreateComment from "../components/createComment"
import Query from "../components/query"

//import { GraphQLClient, gql } from 'graphql-request';

//import { gql } from 'graphql-tag'
//import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

//const graphqlAPI = process.env.NEXT_PUBLIC_API_URL

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default function createComments(req, res) {
  // const client = new ApolloClient({
  //    uri: "https://strapi-bilblog-eu.herokuapp.com/",
  ////    cache: new InMemoryCache(),
  //  })

  const { id, name, email, comment } = req.body.data

  const variables = { name, email, comment, article: { id } }
  return <CreateComment variables={variables} />
}

//res.status(200).json(result)

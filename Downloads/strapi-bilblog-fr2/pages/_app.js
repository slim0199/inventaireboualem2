import React from "react"
import Head from "next/head"
import "../assets/css/style.css"
import "../styles/globals.scss"
import "tailwindcss/tailwind.css"
import { ApolloProvider } from "@apollo/react-hooks"
import Layout from "../components/layout"
import { appWithTranslation } from "next-i18next"
import withData from "../utils/apollo"

const MyApp = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <Head>
        <title>Strapi blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
} // Wraps all components in the tree with the data provider

// MyApp.getInitialProps = async function ({ Component, ctx }) {
// let pageProps = {}
// if (Component.getInitialProps) {
//    pageProps = await Component.getInitialProps(ctx)
// }
// pageProps.query = ctx.query
// pageProps.locale = ctx.locale

// return { pageProps }
// }

export default withData(appWithTranslation(MyApp))

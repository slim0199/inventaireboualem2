import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { useRouter } from "next/router"

const Query2 = ({ children, query, slug, categories, id }) => {
  const router = useRouter()
  const { locale } = router

  const { data, loading, error } = useQuery(query, {
    variables: { id: parseInt(id), locale: locale, slug, categories },
  })
  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error.message}`
  return children({ data })
}

export default Query2

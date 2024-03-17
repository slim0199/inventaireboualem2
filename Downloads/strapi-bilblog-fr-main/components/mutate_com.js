import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { useRouter } from "next/router"

const Mutate = ({ children, mutation, variables }) => {
  const router = useRouter()
  const { locale } = router

  const { data, loading, error } = useMutation(mutation, {
    variables: { variables, locale: locale },
  })
  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error.message}`

  return children({ data })
}

export default Mutate

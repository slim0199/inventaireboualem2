import React from "react"
import CREATE_COMMENT from "../apollo/mutations/comment/comment"
import Mutate from "./mutate_com"
import { useRouter } from "next/router"

const CreateComment = ({ variables }) => {
  const router = useRouter()
  const { locale } = router
  return (
    <Mutate mutation={CREATE_COMMENT} variables={variables}>
      {({ data: { createComment } }) => {
        return json(createComment.data)
      }}
    </Mutate>
  )
}

export default CreateComment

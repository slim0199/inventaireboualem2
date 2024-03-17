import React, { useEffect, useState } from "react"
import moment from "moment"
import parse from "html-react-parser"
import { useTranslation, i18n } from "next-i18next"
import COMMENT_QUERY from "../apollo/queries/comment/comments"
import Query from "../components/query"
import { useRouter } from "next/router"

const Comments = ({ id }) => {
  const { t } = useTranslation("common", { i18n })
  const router = useRouter()
  const { locale } = router
  var form = "ll"
  moment.defaultFormat = "MMM DD,YYYY "
  if (locale == "en") {
    moment.locale("en")
    form = "MMM Do YYYY"
  }
  if (locale == "ar-DZ") {
    moment.locale("ar-dz")
    form = "LLLL"
  } else {
    if (locale == "fr-FR") moment.locale("fr")
    form = "DD MMM YYYY"
  }

  return (
    <>
      <Query query={COMMENT_QUERY} id={id} locale={locale}>
        {({ data: { comments } }) => {
          if (!comments) {
            return <p>Pas de commentaires pour le moment</p>
          } else {
            return (
              <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                  {comments.length} {t("Comments")}
                </h3>
                {comments.data.map((comment, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 mb-4 pb-4"
                  >
                    <p className="mb-4">
                      <span className="font-semibold">
                        {comment.attributes.name}
                      </span>{" "}
                      on {moment(comment.attributes.createdAt).format(form)}
                    </p>
                    <p className="whitespace-pre-line text-gray-600 w-full">
                      {parse(comment.attributes.comment)}
                    </p>
                  </div>
                ))}
              </div>
            )
          }
        }}
      </Query>
    </>
  )
}

export default Comments

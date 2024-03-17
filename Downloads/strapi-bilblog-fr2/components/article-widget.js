import React, { useState, useEffect } from "react"
import Query2 from "./query2"
import SIMILAR_QUERY from "../apollo/queries/article/similar"
import { useTranslation, i18n } from "next-i18next"
import WidgetCard from "./widget-card"
import { useRouter } from "next/router"

const ArticleWidget = ({ slug, categories, id, locale }) => {
  const router = useRouter()

  const { t } = useTranslation("common", { i18n })
  const slug2 = {
    eq: slug,
  }

  return (
    <div>
      <Query2
        query={SIMILAR_QUERY}
        id={null}
        slug={slug2}
        categories={categories}
        locale="all"
      >
        {({ data: { articles } }) => {
          return (
            <div>
              <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                {slug ? (
                  <h3 className="text-xl font-semibold border-b pb-4">
                    {t("Related Posts")}{" "}
                  </h3>
                ) : (
                  <h3 className="text-xl  font-semibold border-b pb-4">
                    {t("Recents Posts")}
                  </h3>
                )}

                <div>
                  {articles.data.map((article, i) => {
                    return (
                      <WidgetCard
                        article={article}
                        key={`article__${article.id}`}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }}
      </Query2>
    </div>
  )
}

export default ArticleWidget

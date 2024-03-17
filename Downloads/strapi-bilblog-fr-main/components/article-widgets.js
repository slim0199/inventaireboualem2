import React, { useState, useEffect } from "react"
import Query from "./query"
import RECENTS_QUERY from "../apollo/queries/article/recents"
import { useTranslation, i18n } from "next-i18next"
import WidgetCard from "./widget-card"

const ArticleWidgets = ({ id, locale }) => {
  const { t } = useTranslation("common", { i18n })

  return (
    <div>
      <Query query={RECENTS_QUERY} id={null} locale={locale}>
        {({ data: { articles } }) => {
          return (
            <div>
              <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                <h3 className="text-xl font-semibold border-b pb-4">
                  {t("Recents Posts")}
                </h3>

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
      </Query>
    </div>
  )
}

export default ArticleWidgets

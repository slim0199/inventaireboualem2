import React from "react"
import Articles from "../components/articles"
import Favoris from "../components/favoris"
import Query from "../components/query"
import ARTICLES_QUERY from "../apollo/queries/article/articles"
import FAVORIS_QUERY from "../apollo/queries/article/favoris"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Categories from "../components/categories"
import ArticleWidgets from "../components/article-widgets"
import apolloClient from "../utils/apollo2"

const Home = () => {
  const router = useRouter()
  const { locale } = router
  const { t } = useTranslation("common")

  return (
    <div className="container mx-auto px-10 mb-8">
      <Query query={FAVORIS_QUERY}>
        {({ data: { articles } }) => {
          return <Favoris articles={articles} />
        }}
      </Query>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <Query query={ARTICLES_QUERY}>
            {({ data: { articles } }) => {
              return <Articles articles={articles} />
            }}
          </Query>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <ArticleWidgets locale={locale} />
            <Categories locale={locale} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(ctx) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
    revalidate: 1,
  }
}

export default Home

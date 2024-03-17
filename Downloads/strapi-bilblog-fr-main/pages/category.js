import { useRouter } from "next/router"
import Query from "../components/query"
import CATEGORY_ARTICLES_QUERY from "../apollo/queries/category/articles"
import Categories from "../components/categories"
import Articles from "../components/articles"
import Custom404 from "./404"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const Category = ({ query }) => {
  const router = useRouter()
  const { locale } = router
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <div>
              <Query
                query={CATEGORY_ARTICLES_QUERY}
                id={router.query.id}
                locale={locale}
              >
                {({ data: { category } }) => {
                  if (category.data == null) {
                    // Giving the page no props will trigger a 404 page
                    return <Custom404 />
                  }
                  return (
                    <div>
                      <Articles articles={category.data.attributes.articles} />
                    </div>
                  )
                }}
              </Query>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
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

export default Category

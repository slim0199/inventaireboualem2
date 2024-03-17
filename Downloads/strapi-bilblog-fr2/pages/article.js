/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useRouter } from "next/router"
import { React, useEffect } from "react"
import Query from "../components/query"
import ReactMarkdown from "react-markdown"
import ARTICLE_QUERY from "../apollo/queries/article/article"
import Comments from "../components/comments"
import CommentsForm from "../components/commentsForm"
import Categories from "../components/categories"
import ArticleWidget from "../components/article-widget"
import moment from "moment"
import "moment/locale/ar-dz"
import "moment/locale/fr"
import dynamic from "next/dynamic"
import Custom404 from "./404"
import NextImage from "next/image"
import { getStrapiMedia } from "../utils/media"
import { i18n } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

//const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false })

const Article = () => {
  try {
    const router = useRouter()
    const { locale } = router

    var form = "ll"
    if (locale == "en") {
      moment.locale("en")
      form = "MMM Do YYYY"
    }
    if (locale == "ar-DZ") {
      moment.locale("ar-dz")
      form = "LLLL"
    } else {
      if (locale == "fr-FR") moment.locale("fr")
      form = " DD MMM YYYY"
    }

    return (
      <Query query={ARTICLE_QUERY} id={router.query.id}>
        {({ data: { article } }) => {
          if (article.data == null) {
            // Giving the page no props will trigger a 404 page
            return <Custom404 />
          }

          return (
            <>
              <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="col-span-1 lg:col-span-8">
                    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
                      <div className=" overflow-hidden shadow-md mb-6">
                        <NextImage
                          src={getStrapiMedia(
                            article.data.attributes.image.data.attributes.url
                          )}
                          // placeholder="blur"
                          layout="responsive"
                          height={900}
                          width={1200}
                          alt={article.data.attributes.content}
                          className="object-top object-cover absolute shadow-lg rounded-t-lg lg:rounded-lg"
                        />
                      </div>
                      <div className="px-4 lg:px-0">
                        <div className="flex items-center mb-8 w-full">
                          <div className="hidden md:flex  justify-center lg:mb-0 lg:w-auto mr-8 items-center">
                            <NextImage
                              alt={
                                article.data.attributes.author.data.attributes
                                  .name
                              }
                              height={30}
                              width={30}
                              // placeholder="blur"
                              className="align-middle rounded-full"
                              src={getStrapiMedia(
                                article.data.attributes.author.data.attributes
                                  .picture.data.attributes.url
                              )}
                            />
                          </div>
                          <div className="font-medium text-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 inline mr-2 text-pink-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="align-middle">
                              {moment(
                                article.data.attributes.published_at
                              ).format(form)}
                            </span>
                          </div>
                        </div>
                        <h1 className="mb-8 text-3xl text-gray-700  font-semibold">
                          {article.data.attributes.title}
                        </h1>
                        <ReactMarkdown
                          // eslint-disable-next-line react/no-children-prop
                          children={article.data.attributes.content}
                        />
                      </div>
                    </div>
                    <div>
                      <CommentsForm article={router.query.id} />
                      <Comments id={router.query.id} />
                    </div>
                  </div>
                  <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                      <ArticleWidget
                        slug={article.data.attributes.slug}
                        categories={
                          article.data.attributes.category.data.attributes.name
                        }
                      />
                      <Categories locale={locale} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </Query>
    )
  } catch (error) {
    console.log("error detected")
  }
}

export async function getStaticProps(ctx) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
    revalidate: 1,
  }
}

export default Article

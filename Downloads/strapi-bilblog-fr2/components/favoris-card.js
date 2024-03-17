import React, { useEffect } from "react"
import moment from "moment"
import NextImage from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import "moment/locale/ar-dz"
import "moment/locale/fr"
import { i18n } from "next-i18next"
import { getStrapiMedia } from "../utils/media"

const FavorisCard = ({ article }) => {
  useEffect(() => {
    document.body.dir = i18n.dir()
  }, [])
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
    form = "DD MMM YYYY"
  }
  return (
    <div className="relative h-72 pt-4">
      <div
        className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
        style={{
          backgroundImage: `url(${getStrapiMedia(
            article.attributes.image.data.attributes.url
          )})`,
        }}
      />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
      <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
        <p className="text-white mb-4 text-shadow font-semibold text-xs">
          {moment(article.attributes.createdAt).format(form)}
        </p>
        <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
          {article.attributes.title}
        </p>
        <div className="flex items-center absolute bottom-5 w-full justify-center">
          <NextImage
            unoptimized
            alt={article.attributes.author.data.attributes.name}
            height={30}
            width={30}
            //placeholder="blur"
            className="align-middle drop-shadow-lg rounded-full"
            src={getStrapiMedia(
              article.attributes.author.data.attributes.picture.data.attributes
                .url
            )}
          />

          <p className="inline align-middle text-white text-shadow ml-2 font-medium">
            {article.attributes.author.data.attributes.name}
          </p>
        </div>
      </div>
      <Link
        href={{
          pathname: "article",
          query: { id: article.id },
        }}
        passHref={true}
      >
        <span className="cursor-pointer absolute w-full h-full" />
      </Link>
    </div>
  )
}

export default FavorisCard

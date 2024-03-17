import React from "react"
import Link from "next/link"
import NextImage from "next/image"
import moment from "moment"
import { useTranslation, i18n } from "next-i18next"
import { useRouter } from "next/router"
import "moment/locale/ar-dz"
import "moment/locale/fr"
import Image from "./image"
import { getStrapiMedia } from "../utils/media"

const Card = ({ article }) => {
  const { t } = useTranslation("common", { i18n })
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
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8  mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <NextImage
          src={getStrapiMedia(article.attributes.image.data.attributes.url)}
          layout="fill"
          //placeholder="blur"
          className="object-top absolute h-90 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>

      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl text-gray-700 font-semibold">
        <Link href={`/article/?id=${article.id}`}>
          {article.attributes.title}
        </Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
          <NextImage
            src={getStrapiMedia(article.attributes.image.data.attributes.url)}
            height={30}
            width={30}
            //placeholder="blur"
            className="align-middle rounded-full"
          />

          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
            {article.attributes.author.data.attributes.name}
          </p>
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
            {moment(article.attributes.createdAt).format(form)}
          </span>
        </div>
      </div>
      <p className="text-center text-medium text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {article.attributes.description}
      </p>
      <div className="text-center">
        <Link
          href={{
            pathname: "article",
            query: { id: article.id },
          }}
          passHref={true}
        >
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-sm font-medium rounded-full text-white px-4 py-1 cursor-pointer">
            {t("Continue Reading")}
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Card

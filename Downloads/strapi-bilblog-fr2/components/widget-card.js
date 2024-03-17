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

const WidgetCard = ({ article }) => {
  const { t } = useTranslation("common", { i18n })

  const router = useRouter()
  const { locale } = router
  var form = "MMM DD, YYYY"

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
    <div className="bg-white  rounded-lg  ">
      <div className="flex  items-center  mb-0 pt-2 w-full ">
        <div className="flex-none  w-16  ">
          <NextImage
            src={getStrapiMedia(article.attributes.image.data.attributes.url)}
            className=" rounded-full"
            height={60}
            width={60}
            // placeholder="blur"
          />
        </div>
        <div className="flex-grow ml-2">
          <p className=" text-gray-700 ml-2 font-medium text-medium">
            {article.attributes.author.data.attributes.name}
          </p>
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
          <h1 className=" hover:text-pink-600 ml-2 pt-0   text-lg font-medium text-medium text-inherit px-0 ">
            <Link href={`/article/?id=${article.id}`}>
              {article.attributes.title}
            </Link>
          </h1>
        </div>
      </div>
    </div>
  )
}
export default WidgetCard

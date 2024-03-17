/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/link-passhref */
import React, { useEffect } from "react"
import Query from "./query"
import CATEGORIES_QUERY from "../apollo/queries/category/categories"
import Link from "next/link"
import { i18n } from "next-i18next"
import LocaleSwitcher from "./locale-switcher"
import { useRouter } from "next/router"

const Header = () => {

  const router = useRouter()
  const { locale,asPath, activeLocale} = router

  if (i18n) {
    useEffect(() => {
      document.body.dir = i18n.dir();
    },[])
  }

  var logo = ""
if (locale == "en") {
    logo = "Jijel's Blog"
  }
  if (locale == "ar-DZ") {  
    logo= "مدونة دي جيجل"
  } else {
    if (locale == "fr-FR") 
    logo = "Blog Di Jijel"
  }

  return (   
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href={`/`} >
            <span className="cursor-pointer font-bold text-5xl hover:text-gray-300 text-white">
              {logo}
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          <Query query={CATEGORIES_QUERY} id={null} >
            {({ data: { categories } }) => {
              return (
                <div>
                  <span className="md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer">
                    {" "}
                    <LocaleSwitcher />
                  </span>
                  {categories.data.map((category, index) => (
                    <Link
                      key={index}
                      href={`/category/?id=${category.id}`}
                    >
                      <span className="md:float-right mt-2 align-middle  hover:text-gray-300 text-white ml-4 text-2xl font-semibold cursor-pointer">
                        {category.attributes.name}{" "}
                      </span>
                    </Link>
                  ))}
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    </div>   
  )
}
export default Header

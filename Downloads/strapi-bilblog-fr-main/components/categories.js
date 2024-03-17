import React, { useState, useEffect } from "react"
import Link from "next/link"
import Query from "../components/query"
import CATEGORIES_QUERY from "../apollo/queries/category/categories"
import { useTranslation, i18n } from "next-i18next"

const Categories = () => {
  const { t } = useTranslation("common", { i18n })
  return (
    <div>
      <Query query={CATEGORIES_QUERY} id={null}>
        {({ data: { categories } }) => {
          return (
            <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
              <h3 className="text-2xl mb-8 font-semibold border-b pb-4">
                {t("Categories")}
              </h3>
              {categories.data.map((category, index) => (
                <Link legacyBehavior
                  key={index}
                  href={{
                    pathname: "category",
                    query: { id: category.id },
                  }}
                >
                  <a
                    className={`cursor-pointer block ${
                      index === categories.length - 1
                        ? "border-b-0"
                        : "border-b"
                    } pb-3  mb-3`}
                  >
                    {category.attributes.name}
                  </a>
                </Link>
              ))}
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default Categories

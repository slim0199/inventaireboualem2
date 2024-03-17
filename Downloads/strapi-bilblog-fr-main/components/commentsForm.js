import React, { useState, useEffect, useRef } from "react"
import { submitComment } from "../services"
import { appWithTranslation, useTranslation, i18n } from "next-i18next"
import { useRouter } from "next/router"

const CommentsForm = ({ article }) => {
  const { t } = useTranslation("common", { i18n })
  const router = useRouter()
  const { pathname, query, asPath, route, locale } = router
  const [error, setError] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name")
    emailEl.current.value = window.localStorage.getItem("email")
  }, [])

  const handleCommentSubmission = () => {
    setError(false)

    const { value: name } = nameEl.current
    const { value: comment } = commentEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

    if (!name || !email || !comment) {
      setError(true)
      return
    }
    const commentObj = {
      name,
      email,
      comment,
      locale,
      article,
    }

    if (storeData) {
      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
    } else {
      localStorage.removeItem("name")
      localStorage.removeItem("email")
    }

    submitComment(commentObj).then((res) => {
      router.reload({ scroll: false })
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {t("Leave a Reply")}
      </h3>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder={t("Comment")}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
            {" "}
            {t(
              "Save my name, email in this browser for the next time I comment."
            )}
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">{t("All fields are mandatory")}</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          {t("Post Comment")}
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            {t("Comment submitted for review")}
          </span>
        )}
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
export default CommentsForm

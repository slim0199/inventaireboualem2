import { useTranslation, i18n } from "next-i18next"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Custom404() {
  const { t } = useTranslation("common", { i18n })
  const router = useRouter()

  const { locale } = router

  var Texte = "Page Not Found"
  var Retour = "Retour vers Homepage"
  if (locale == "ar-DZ") Texte = " صفحة غير موجودة"
  if (locale == "fr-FR") Texte = " Page Non disponible"
  if (locale == "en") Texte = " Page Not Found"

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="bg-white shadow-lg   rounded-lg lg:p-8 pb-12 mb-8">
        <h1 className="text-3xl text-center font-semibold text-gray-500 ">
          {Texte}
        </h1>
        <Link legacyBehavior href="/">
          <a className="text-xl   font-semibold text-gray-500 ">{Retour}</a>
        </Link>
      </div>
    </div>
  )
}

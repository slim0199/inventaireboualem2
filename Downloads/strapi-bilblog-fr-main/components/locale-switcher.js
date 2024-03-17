import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale, route } = router
  const otherLocales = locales.filter((locale) => locale !== activeLocale)
  const { t } = useTranslation("common")
  return (
    <div>
      <ul>
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router
          return (
            <li key={locale}>
              <Link   legacyBehavior href={"/"} locale={locale}>
                <a>
                  {locale == "en"
                    ? `-English `
                    : locale == "fr-FR"
                    ? "Français"
                    : "عربي"}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

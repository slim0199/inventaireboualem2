import dynamic from "next/dynamic"
import { useTranslation, i18n, I18nContext } from "next-i18next"

const Header = dynamic(() => import("./header"), { ssr: false })

const Layout = ({ children, seo }) => (
  <>
    <Header />
    {children}
  </>
)

export default Layout

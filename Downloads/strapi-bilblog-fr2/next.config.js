
require("dotenv").config()

const withFonts = require("next-fonts")

const withTM = require("next-transpile-modules")(["react-markdown"])

/**
 * @type {import('next').NextConfig}

 */
const { i18n } = require("./next-i18next.config")

const nextConfig = {
  i18n,
  trailingSlash: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "default",
    domains: ["localhost", "res.cloudinary.com"],
  },
}
;(module.exports = nextConfig), withTM({ webpack5: false })

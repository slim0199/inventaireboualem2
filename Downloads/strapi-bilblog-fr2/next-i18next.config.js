const path = require("path")
module.exports = {
  i18n: {
    defaultLocale: "fr-FR",
    locales: ["en", "ar-DZ", "fr-FR"],
    localePath: path.resolve("./public/locales"),
    localeDetection: false,
  },
  react: { useSuspense: false },
}

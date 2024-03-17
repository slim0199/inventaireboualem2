import { gql } from "graphql-tag"

const CATEGORIES_QUERY = gql`
  query Categories($locale: I18NLocaleCode!) {
    categories(locale: $locale) {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }
`
export default CATEGORIES_QUERY

import { gql } from "graphql-tag"

const COMMENT_QUERY = gql`
  query Comments($id: ID!, $locale: I18NLocaleCode!) {
    comments(locale: $locale, filters: { article: { id: { eq: $id } } }) {
      data {
        attributes {
          name
          createdAt
          comment
        }
      }
    }
  }
`

export default COMMENT_QUERY

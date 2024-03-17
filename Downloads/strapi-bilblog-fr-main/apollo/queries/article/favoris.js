import { gql } from "graphql-tag"

const FAVORIS_QUERY = gql`
  query Articles($locale: I18NLocaleCode!) {
    articles(locale: $locale, filters: { favori: { eq: true } }) {
      data {
        id
        attributes {
          title
          slug
          author {
            data {
              attributes {
                name
                picture {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          category {
            data {
              id
              attributes {
                name
              }
            }
          }
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`

export default FAVORIS_QUERY

import { gql } from "graphql-tag"

const ARTICLES_QUERY = gql`
  query Articles($locale: I18NLocaleCode!) {
    articles(locale: $locale) {
      data {
        id
        attributes {
          title
          description
          slug
          author {
            data {
              attributes {
                name
                createdAt
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

export default ARTICLES_QUERY;
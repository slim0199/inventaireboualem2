import { gql } from "graphql-tag"

const RECENTS_QUERY = gql`
  query Articles($locale: I18NLocaleCode!) {
    articles(
      locale: $locale
      sort: "createdAt:desc"
      pagination: { limit: 3 }
    ) {
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

export default RECENTS_QUERY

import { gql } from "graphql-tag"

const SIMILAR_QUERY = gql`
  query Articles(
    $slug: StringFilterInput!
    $categories: [String!]
    $locale: I18NLocaleCode!
  ) {
    articles(
      locale: $locale
      pagination: { limit: 3 }
      filters: {
        slug: { not: $slug }
        and: { category: { name: { in: $categories } } }
      }
    ) {
      data {
        id
        attributes {
          title
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
          image {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
          slug
        }
      }
    }
  }
`

export default SIMILAR_QUERY

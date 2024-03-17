import { gql } from "graphql-tag"

const ARTICLE_QUERY = gql`
  query Articles($id: ID!) {
    article(id: $id) {
      data {
        id
        attributes {
          title
          description
          content
          slug
          image {
            data {
              attributes {
                url
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
          publishedAt
          createdAt
          image {
            data {
              attributes {
                url
              }
            }
          }
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
        }
      }
    }
  }
`

export default ARTICLE_QUERY

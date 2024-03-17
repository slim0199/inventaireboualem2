import { gql } from "graphql-tag"

const CREATE_COMMENT = gql`
  mutation CreateComment(
    $name: String!
    $email: String!
    $comment: String!
    $article: ID!
    $locale: I18NLocaleCode!
  ) {
    createComment(
      locale: $locale
      data: { name: $name, email: $email, comment: $comment, article: $article }
    ) {
      data {
        attributes {
          name
          email
          comment
          locale
          article {
            data {
              id
            }
          }
        }
      }
    }
  }
`

export default CREATE_COMMENT

import { gql } from 'graphql-tag'

const CATEGORY_ARTICLES_QUERY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      data {
        attributes {
          name
          articles {
            data {
              id
              attributes {
                title
                content
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
                      slug
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
export default CATEGORY_ARTICLES_QUERY
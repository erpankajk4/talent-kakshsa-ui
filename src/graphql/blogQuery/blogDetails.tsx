import { gql } from "@apollo/client";

export const getBlogDetails = gql`
  query getBlogDetails($ID: ID) {
    blog(id: $ID) {
      data {
        id
        attributes {
          title
          bgImage {
            data {
              attributes {
                url
              }
            }
          }
          description
          author {
            data {
              attributes {
                avatar {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                name
                designation
              }
            }
          }
          content
          updatedAt
        }
      }
    }
  }
`;

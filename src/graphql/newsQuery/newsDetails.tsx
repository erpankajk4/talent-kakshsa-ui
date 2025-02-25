import { gql } from "@apollo/client";

export const getNewsDetails = gql`
  query getNewsDetails($ID: ID!) {
    new(id: $ID) {
      data {
        id
        attributes {
          bgImage {
            data {
              id
              attributes {
                url
              }
            }
          }
          title
          description
          tag {
            data {
              id
              attributes {
                tag
              }
            }
          }
          author {
            data {
              id
              attributes {
                avatar {
                  data {
                    id
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

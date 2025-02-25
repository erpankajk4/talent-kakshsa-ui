import { gql } from "@apollo/client";

export const getAllCommunity = gql`
query getCommunity{
    communities{
     meta {
        pagination {
          total
        }
      }
      data{
         id
        attributes{
          title
          bgImage{
            data{
              id
              attributes{
                url
              }
            }
          }
          totalMembersJoined
        }
      }
    }
  }
    `
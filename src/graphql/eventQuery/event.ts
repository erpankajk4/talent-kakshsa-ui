import { gql } from "@apollo/client";
export const getAllEvents = gql`
  query getAllEvents($page: Int, $pageSize: Int) {
  events(pagination: { page: $page, pageSize: $pageSize }) {
    meta {
      pagination {
        total
      }
    }
    data {
      id
      attributes {
        title
        hostName
        usersAvatars {
          data {
            id
            attributes {
              url
            }
          }
        }
        timeFrom
        timeTo
        eventMedium
      }
    }
  }
}

`;
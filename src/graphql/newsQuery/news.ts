import { gql } from "@apollo/client";

export const getAllNews = gql`
  query getAllNews(
  $category: String, 
  $newsSortingParameter: [String]
      $page: Int
    $pageSize: Int
  ) {
    news(
      sort: $newsSortingParameter
      filters: { category: { category: { eq: $category } } }
       pagination: { page: $page, pageSize: $pageSize }
    ) {
      meta {
        pagination {
          total
        }
      }
      data {
        id
        attributes {
          icon {
            data {
              id
              attributes {
                url
              }
            }
          }
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
          category {
            data {
              id
              attributes {
                category
              }
            }
          }
          slug
          tag {
            data {
              id
              attributes {
                tag
              }
            }
          }
          content
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
                updatedAt
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;

export const getAllNewsCategory = gql`
  query getAllNewsCategory {
    newsCategories {
      data {
        attributes {
          category
        }
      }
    }
  }
`;

export const getNewsDetails = gql`
  query getNewsDetails($ID: ID) {
    new(id: $ID) {
      data {
        attributes {
          icon {
            data {
              id
              attributes {
                url
              }
            }
          }
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
          category {
            data {
              id
              attributes {
                category
              }
            }
          }
          slug
          tag {
            data {
              id
              attributes {
                tag
              }
            }
          }
          content
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
                updatedAt
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;

export const getAllNewsSortingParameter = gql`
  query getAllNewsSortingParameter {
    news {
      data {
        attributes {
          updatedAt
          newsSequence
          featuredSequence
          recommendedSequence
          trendingSequence
          topSequence
        }
      }
    }
  }
`;
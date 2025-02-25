import { gql } from "@apollo/client";

export const getAllBlogs = gql`
  query getAllBlogs(
    $category: String
    $blogSortingParameter: [String]
    $page: Int
    $pageSize: Int
  ) {
    blogs(
      sort: $blogSortingParameter
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
          title
          bgImage {
            data {
              id
              attributes {
                url
              }
            }
          }
          description
          tag {
            data {
              attributes {
                tag
              }
            }
          }
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
                updatedAt
              }
            }
          }
            updatedAt
          category {
            data {
              attributes {
                category
              }
            }
          }
        }
      }
    }
  }
`;

export const getAllBlogsSortingParameter = gql`
  query getAllBlogsSortingParameter {
    blogs {
      data {
        attributes {
          updatedAt
          popularSequence
          featuredSequence
        }
      }
    }
  }
`;

export const getAllBlogCategory = gql`
  query getAllBlogCategory {
    blogCategories {
      data {
        id
        attributes {
          category
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
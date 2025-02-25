import { gql } from "@apollo/client";

export const faq = gql`
query getAllFaqs {
  faqs {
    data {
      id
      attributes {
          question
          answer
      }
    }
  }
}
`
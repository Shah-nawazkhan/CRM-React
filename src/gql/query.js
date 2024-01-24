import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query {
    customers {
      name
      _id
      createdAt
      updatedAt
      email
      phone
      company
      labels
      notes {
        description
      }
    }
  }
`;
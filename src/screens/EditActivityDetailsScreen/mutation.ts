import { gql } from "@apollo/client";

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity($input: UpdateActivityInput!) {
    updateActivity(input: $input) {
      id
      name
      category
      subcategories
      fullDescription
      shortDescription
      freeTrial
      address
      images
    }
  }
`;

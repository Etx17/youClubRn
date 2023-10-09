import { gql } from "@apollo/client";

export const UPDATE_SUB_GROUP = gql`
  mutation UpdateSubGroup($input: UpdateSubGroupInput!) {
    updateSubGroup(input: $input) {
      name
      minPrice
      classType
      shortDescription
      tarifications
    }
  }
`;

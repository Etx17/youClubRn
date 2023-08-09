import { gql } from "@apollo/client";

export const CREATE_SUBGROUP = gql`
  mutation CreateSubGroup(
    $name: String!,
    $shortDescription: String!,
    $activityId: ID!,
    $minPrice: Float!,
    $classType: String!,
    $tarifications: [String!]
  ) {
    createSubGroup(
      input: {
        name: $name,
        shortDescription: $shortDescription,
        activityId: $activityId,
        minPrice: $minPrice,
        classType: $classType,
        tarifications: $tarifications
      }
    ) {
      id
    }
  }
`;


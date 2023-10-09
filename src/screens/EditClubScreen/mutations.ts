import { gql } from "@apollo/client";

export const UPDATE_CLUB = gql`
  mutation UpdateClub($input: UpdateClubInput!) {
    updateClub(input: $input) {
      id
      name
      category
      subcategory
      website
      objet
      images
    }
  }
`;

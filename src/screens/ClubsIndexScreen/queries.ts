import { gql } from "@apollo/client";
export const GET_CLUBS_BY_ZIPCODE = gql`
  query ClubsByZipcode($actualZipcode: String!) {
    clubsByZipcode(actualZipcode: $actualZipcode) {
      id
      name
      objet
      category
      subcategory
      categoryNumber
      subcategoryNumber
      geoPoint
      address
      actualZipcode
    }
  }
`;

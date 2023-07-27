import { gql } from '@apollo/client';
export const GET_ACTIVITIES = gql`
  query GetActivities($zipcode: String!) {
    activities(zipcode: $zipcode) {
      id
      name
      geoPoint
      category
      address
      actualZipcode
      freeTrial
      subcategories
      shortDescription
      fullDescription
      club {
        id
        name
      },
    }
  }
`;

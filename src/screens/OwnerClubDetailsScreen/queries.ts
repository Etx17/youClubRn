import { gql } from '@apollo/client';

export const GET_CLUB_BY_USER_ID = gql`
  query GetClubByUserId($userId: ID!) {
    clubByUserId(userId: $userId) {
      id
      name
      geoPoint
      category
      subcategory
      address
      actualZipcode
      address
      objet
      images
      activities {
        id
        name
      }
    }
  }
`;

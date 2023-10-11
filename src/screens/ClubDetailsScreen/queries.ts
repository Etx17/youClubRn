import { gql } from "@apollo/client";
export const GET_ACTIVITIES_BY_CLUB_ID = gql`
  query ActivitiesByClubId($clubId: ID!) {
    activitiesByClubId(clubId: $clubId) {
      id
      name
    }
  }
`;

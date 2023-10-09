import { gql } from "@apollo/client";

export const GET_ACTIVITY_IMAGES = gql`
  query GetActivityImages($id: ID!) {
    activity(id: $id) {
      images
    }
  }
`;

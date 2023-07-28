import { gql } from '@apollo/client';
export const GET_ACTIVITY = gql`
  query GetActivity($id: ID!) {
    activity(id: $id) {
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
      }
      subGroups {
        id
        activityId
        name
        minPrice
        maxPrice
        recurrence
        shortDescription
        classType
        subscriptionByReccurencePrice
        tarifications
        schedules {
          id
          day
          timeSlots {
            startTime
            endTime
          }
        }
      }
    }
  }
`;
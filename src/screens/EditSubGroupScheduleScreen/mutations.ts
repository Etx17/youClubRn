import { gql } from "@apollo/client";

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule($id: ID!, $timeSlots: [TimeSlotUpdateInput!]!) {
    updateSchedule(input: {id: $id, timeSlots: $timeSlots}) {
      id
      timeSlots {
        startTime
        endTime
      }
    }
  }
`;

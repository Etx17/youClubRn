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

export const DELETE_TIME_SLOT = gql`
  mutation DeleteTimeSlot($id: ID!) {
    deleteTimeSlot(input: {id: $id}) {
      id
    }
  }
`;

import { gql } from "@apollo/client";

export const CREATE_TIMESLOT = gql`
  mutation CreateTimeSlot($input: CreateTimeSlotInput!) {
    createTimeSlot(input: $input) {
      id
      scheduleId
      startTime
      endTime
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




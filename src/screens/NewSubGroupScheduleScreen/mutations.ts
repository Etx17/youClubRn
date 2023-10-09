import { gql } from "@apollo/client";

export const CREATE_SCHEDULE = gql`
  mutation CreateShedule($subGroupId: ID!, $day: String!) {
    createSchedule(
      input: { subGroupId: $subGroupId, day: $day, }
    ){
      id
    }
  }
`;

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

import { gql } from "@apollo/client";

export const CREATE_SCHEDULE = gql`
  mutation CreateShedule(
    $subGroupId: ID!,
    $day: String!,
    $timeSlots: [TimeSlotInput!],
  ) {
    createSchedule(
      input: {
        subGroupId: $subGroupId,
        day: $day,
        timeSlots: $timeSlots
      }
    ){
      id
    }
  }
`;


import { gql } from "@apollo/client";
export const GET_TIMESLOTS_BY_SCHEDULE_ID = gql`
  query TimeSlotsByScheduleId($scheduleId: ID!) {
    timeSlotsByScheduleId(scheduleId: $scheduleId) {
      id
      scheduleId
      startTime
      endTime
    }
  }
`;

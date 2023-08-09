import { gql } from "@apollo/client";

export const DELETE_SUB_GROUP = gql`
mutation DeleteSubGroup($input: DeleteSubGroupInput!) {
  deleteSubGroup(input: $input) {
    id
    name
  }
}
`;
export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($input: DeleteScheduleInput!) {
    deleteSchedule(input: $input) {
      id
    }
  }
`;

import { gql } from "@apollo/client";

export const DELETE_SUB_GROUP = gql`
mutation DeleteSubGroup($input: DeleteSubGroupInput!) {
  deleteSubGroup(input: $input) {
    id
    name
  }
}
`;

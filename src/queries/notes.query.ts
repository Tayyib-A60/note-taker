import { gql } from "@apollo/client";

export const GET_USER_NOTES = gql`
query GetNotes($user_id: String!) {
    notes(where: {user_id: {_eq: $user_id}}) {
        id
        user_id
        title
        summary
        created_at
    }
  }  
`;

export const CREATE_NOTE = gql`
mutation($title: String!, $summary: String!, $id: uuid!, $user_id: String!, $created_at: timestamptz!){
  insert_notes(objects: [{title: $title, summary: $summary, id: $id, user_id: $user_id,  created_at: $created_at }]) {
    returning {
        id
        user_id
        title
        summary
        created_at
    }
  }
}
`;

export const UPDATE_NOTE = gql`
  mutation updateNote ($title: String!, $summary: String!, $id: uuid!) {
      update_notes(where: {id: {_eq: $id}}, _set: {title: $title, summary: $summary}) {
        affected_rows
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation removeNote ($id: uuid!) {
    delete_notes(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;
import { gql } from "@apollo/client";

export const GET_NOTES = gql`
query MyQuery {
    notes {
        title,
        summary
    }
  }  
`;;
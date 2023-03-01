import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      workouts {
        _id
        activity
        meters
        adjustedMeters
        date
        notes
      }
    }
  }
`;
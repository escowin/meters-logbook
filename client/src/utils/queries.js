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

export const QUERY_WORKOUT = gql`
  query workout($id: ID!) {
    workout(_id: %id) {
      _id
      activity
      meters
      adjustedMeters
      date
      notes
    }
  }
`;

export const QUERY_WORKOUTS = gql`
  query workouts($username: String) {
    workouts(username: $username) {
      _id
      activity
      meters
      adjustedMeters
      date
      notes
    }
  }
`;

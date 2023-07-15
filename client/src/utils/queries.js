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
        adjusted
        date
        notes
      }
    }
  }
`;

// to-do | apollo graphql | 'directives' : use the above query to request less information in place of query_me_basic.
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      totalMeters
      dailyMeters
      workouts {
        _id
        meters
        adjusted
      }
    }
  }
`;

export const QUERY_WORKOUT = gql`
  query workout($id: ID!) {
    workout(_id: $id) {
      _id
      activity
      meters
      adjusted
      date
      notes
      username
    }
  }
`;

export const QUERY_WORKOUTS = gql`
  query workouts($username: String) {
    workouts(username: $username) {
      _id
      activity
      meters
      adjusted
      date
      notes
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      workouts {
        _id
        date
        activity
        meters
      }
    }
  }
`;

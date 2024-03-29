import { gql } from "@apollo/client";

export const QUERY_STATS = gql`
  {
    me {
      username
      weeklyGoal
      remaining
      dailyMeters
      weeklyMeters
      monthlyMeters
      weeklyBreakdown
      totalMeters
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
      monthlyMeters
      weeklyMeters
      dailyMeters
      workouts {
        _id
        date
        meters
        adjusted
        activity
        notes
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
        adjusted
      }
    }
  }
`;

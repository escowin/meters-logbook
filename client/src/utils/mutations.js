import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout(
    $activity: String!
    $date: String!
    $meters: Int!
    $notes: String
  ) {
    addWorkout(
      activity: $activity
      meters: $meters
      date: $date
      notes: $notes
    ) {
      _id
      activity
      date
      meters
      createdAt
      notes
      username
    }
  }
`;

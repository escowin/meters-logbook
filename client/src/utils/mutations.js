import { gql } from "@apollo/client";

export const USER = {
  ADD_USER: gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
  `,
  LOGIN_USER: gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
  `,
  EDIT_USER: gql`
    mutation EditUser($id: ID!, $weeklyGoal: Int) {
      editUser(_id: $id, weeklyGoal: $weeklyGoal) {
        _id
        weeklyGoal
      }
    }
  `,
};

export const WORKOUT = {
  ADD_WORKOUT: gql`
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
  `,

  DELETE_WORKOUT: gql`
    mutation DeleteWorkout($id: ID!) {
      deleteWorkout(_id: $id) {
        _id
      }
    }
  `,

  EDIT_WORKOUT: gql`
    mutation EditWorkout(
      $id: ID!
      $activity: String
      $meters: Int
      $date: String
      $notes: String
    ) {
      editWorkout(
        _id: $id
        activity: $activity
        meters: $meters
        date: $date
        notes: $notes
      ) {
        _id
        activity
        adjusted
        createdAt
        date
        meters
        notes
        username
      }
    }
  `,
};

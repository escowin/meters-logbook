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

// to-do | write into corresponding server-side schemas
export const ADD_CREWMATE = gql`
  mutation addCrewmate($id: ID!) {
    addCrewmate(crewmateId: $id) {
      _id
      username
      crew
      crewmate {
        _id
        username
      }
    }
  }
`;

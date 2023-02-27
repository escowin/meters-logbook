const { gql } = require("apollo-server-express"); // imports gql tagged template function

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    workouts: [Workout]
  }

  type Workout {
    _id: ID
    activity: String
    meters: Int
    adjustedMeters: Int
    date: String
    username: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    workouts(username: String): [Workout]
    workout(_id: ID!): Workout
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addWorkout(activity: String!, meters: Int!, date: String!): Workout
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// exports typeDefs
module.exports = typeDefs;

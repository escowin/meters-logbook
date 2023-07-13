const { gql } = require("apollo-server-express"); // imports gql tagged template function
// future mutations | add an athlete (), updateUser
// future  user property | type: String, 'coach', 'athelete', 'launch', 'coxsain'
// coaches will query all associated atheletes, atheletes can query me
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
    username: String
    date: String
    notes: String
    createdAt: String
    adjusted: Int
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
    addWorkout(activity: String!, meters: Int!, adjustedMeters: Int!, date: String!, notes: String!): Workout
  }

  type Auth {
    token: ID!
    user: User
  }

`;

// exports typeDefs
module.exports = typeDefs;

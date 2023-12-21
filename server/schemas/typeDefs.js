const { gql } = require("apollo-server-express"); // imports gql tagged template function
// future mutations | add an athlete (), updateUser
// future  user property | type: String, 'coach', 'athelete', 'launch', 'coxsain'
// coaches will query all associated atheletes, atheletes can query me
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    totalMeters: Int
    monthlyMeters: Int
    weeklyMeters: Int
    dailyMeters: Int
    weeklyGoal: Int
    remaining: Int
    weeklyBreakdown: String
    workouts: [Workout]
  }

  type Workout {
    _id: ID
    activity: String
    meters: Int
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
    addWorkout(activity: String!, meters: Int!, date: String!, notes: String): Workout
    deleteWorkout(_id: ID!): Workout
    editUser(_id: ID!, weeklyGoal: Int): User
    editWorkout(_id: ID!, activity: String, meters: Int, date: String, notes: String): Workout
  }

  type Auth {
    token: ID!
    user: User
  }

`;

// exports typeDefs
module.exports = typeDefs;

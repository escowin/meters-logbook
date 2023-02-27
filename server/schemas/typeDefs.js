const { gql } = require('apollo-server-express'); // imports gql tagged template function

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        activities: [Activities]
    }
    
    type Activity {
        _id: ID
        name: String
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
        activities(username: String): [Activities]
        activity(_id: ID!): Activity
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addActivity(name: String!, meters: Int!, date: String!): Activity
    }

    type Auth {
        token: ID!
        user: User
    }
`;

// exports typeDefs
module.exports = typeDefs;
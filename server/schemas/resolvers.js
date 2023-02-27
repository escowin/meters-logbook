const { User, Meters } = require("../models");
const { AuthenticationError } = require("apollo-server-express"); // handles wrong username/password errors
const { signToken } = require("../utils/auth");

// Resolvers: functions connected to each query or mutation type definition that perform the CRUD actions that each query or mutation is expected to perform.

const resolvers = {
    Query: {
        // get
    },
    Mutation: {
        // post, put, delete
    }
};

module.exports = resolvers;

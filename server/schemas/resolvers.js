const { User, Meters } = require("../models");
const { AuthenticationError } = require("apollo-server-express"); // handles wrong username/password errors
const { signToken } = require("../utils/auth");

// Resolvers: functions connected to each query or mutation type definition that perform the CRUD actions that each query or mutation is expected to perform.

const resolvers = {
    Query: {
        // get
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user })
                .select("-__v -password")
                .populate("workouts");

                return userData;
            }

            throw new AuthenticationError("not logged in");
        },

        workouts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Workout.find(params).sort({ createdAt: -1 });
        },

        workout: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

        users: async () => {
            return User.find()
            .select("-__v -password")
            .populate("workouts");
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select("-__v -password")
            .populate("workouts");
        }
    },
    Mutation: {
        // post, put, delete
    }
};

module.exports = resolvers;

const { User, Workout } = require("../models");
const { AuthenticationError } = require("apollo-server-express"); // handles wrong username/password errors
const { signToken } = require("../utils/auth");

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
      return User.find().select("-__v -password").populate("workouts");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("workouts");
    },
  },

  Mutation: {
    // post, put, delete
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addWorkout: async (parent, args, context) => {
      if (context.user) {
        const workout = await Workout.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { workouts: workout._id } },
          { new: true }
        );

        return workout;
      }
      throw new AuthenticationError("you ned to be logged in");
    },
  },
};

module.exports = resolvers;

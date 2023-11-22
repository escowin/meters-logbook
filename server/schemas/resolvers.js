const { User, Workout } = require("../models");
const { AuthenticationError } = require("apollo-server-express"); // handles wrong username/password errors
const { signToken } = require("../utils/auth");

const resolvers = {
  // get requests
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: "workouts",
            // Sorts from newest to oldest
            options: {
              sort: {
                date: -1,
                createdAt: -1,
              },
            },
          });

        return userData;
      }

      throw new AuthenticationError("not logged in");
    },

    // user queries
    users: async () => {
      return User.find().select("-__v -password").populate("workouts");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("workouts");
    },

    // workout queries
    workouts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Workout.find(params).sort({ date: -1 });
    },

    workout: async (parent, { _id }) => {
      return Workout.findOne({ _id });
    },
  },

  // post, put, delete requests
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (err) {
        throw new Error(`Failed to sign up. Original error: ${err.message}`);
      }
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("incorrect credentials");
      }

      try {
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("incorrect credentials");
        }
        const token = signToken(user);

        return { token, user };
      } catch (err) {
        throw new Error(`Failed to login. Original error: ${err.message}`);
      }
    },

    // mutations accesible to logged in users
    addWorkout: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }

      try {
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
      } catch (err) {
        throw new Error(
          `Failed to add workout. Original error: ${err.message}`
        );
      }
    },
    deleteWorkout: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }
      try {
        const workout = await Workout.findByIdAndDelete(_id);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: workout._id } },
          { new: true }
        );

        return workout;
      } catch (err) {
        throw new Error(
          `Failed to delete workout. Original error: ${err.message}`
        );
      }
    },
    // updates field but responds w/ error message for virtuals: "Int cannot represent non-integer value: NaN"
    editUser: async (parent, { _id, ...data }, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }

      try {
        const result = await User.findByIdAndUpdate(
          _id,
          { $set: data },
          { new: true }
        );

        return result;
      } catch (err) {
        throw new Error(`Failed to edit user. Original error: ${err.message}`);
      }
    },
  },
};

module.exports = resolvers;

const { AuthenticationError } = require('apollo-server-express');
const { User, Cake } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('cakes');
          },
          user: async (parent, { username }) => {
            return User.findOne({ username }).populate('cakes');
          },
          cakes: async () => {
            return Cake.find();
            },
            cake: async (parent, { cakeID }) => {
              return Cake.findById(cakeID);
          },
          me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('cakes');
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
          logout: (parent, args, context) => {
            context.res.clearCookie('token');
            return { message: 'Logged out' };
          },
          addCake: async (parent, { cakeInput }) => {
            return Cake.create(cakeInput);
          },
          addCakeToUser: async (parent, { cakeId }, context) => {
            const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { cakes: cakeId } },
              { new: true }
            ).populate('cakes');
            return user;
          },
          removeCakeFromUser: async (parent, { cakeId }, context) => {
            const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { cakes: cakeId } },
              { new: true }
            ).populate('cakes');
            return user;
          },
    }
};

module.exports = resolvers;
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export const ADD_CAKE = gql`
  mutation addCake($cakeName: String!, $cakePrice: String!, $cakeDescription: String!) {
    addCake(cakeName: $cakeName, cakePrice: $cakePrice, cakeDescription: $cakeDescription) {
      _id
      cakeName
      cakePrice
      cakeDescription
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logout {
      message
    }
  }
`;

// addCakeToUser: async (parent, { cakeId }, context) => {
//   const user = await User.findOneAndUpdate(
//     { _id: context.user._id },
//     { $addToSet: { cakes: cakeId } },
//     { new: true }
//   ).populate('cakes');
//   return user;
// },

export const ADD_CAKE_TO_USER = gql`
  mutation addCakeToUser($cakeId: ID!) {
    addCakeToUser(cakeId: $cakeId) {
      _id
      username
      email
      cakes {
        _id
        cakeName
        cakePrice
        cakeDescription
      }
    }
  }
`;

export const REMOVE_CAKE_FROM_USER = gql`
  mutation removeCakeFromUser($cakeId: ID!) {
    removeCakeFromUser(cakeId: $cakeId) {
      _id
      username
      email
      cakes {
        _id
        cakeName
        cakePrice
        cakeDescription
      }
    }
  }
`;


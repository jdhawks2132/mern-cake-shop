import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      cakes {
        _id
        cakeName
        cakePrice
        cakeDescription
        cakeImage
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      cakes {
        _id
        cakeName
        cakePrice
        cakeDescription
        cakeImage
      }
    }
  }
`;

export const QUERY_CAKES = gql`
    query getCakes {
        cakes {
            _id
            cakeName
            cakeImage
        }
    }
`;

export const QUERY_SINGLE_CAKE = gql`
    query getSingleCake($cakeID: ID!) {
        cake(cakeID: $cakeID) {
            _id
            cakeName
            cakePrice
            cakeDescription
            cakeImage
        }
    }
`;

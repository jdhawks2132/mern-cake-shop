const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type Cake {
    _id: ID
    cakeName: String
    cakePrice: Int
    cakeDescription: String
   }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    cakes: [Cake]!
  }
  
   type Auth {
    token: ID!
    user: User
    }

    type Query {
    users: [User]
    user(username: String!): User
    cakes: [Cake]
    cake(cakeName: String!): Cake
    me: User
  }

    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    }

`;

module.exports = typeDefs;
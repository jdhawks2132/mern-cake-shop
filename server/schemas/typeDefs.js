const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Cake {
    _id: ID
    cakeName: String
    cakePrice: Int
    cakeDescription: String
    cakeImage: String
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
   
    type Logout {
    message: String
    }

    input CakeInput {
    cakeName: String
    cakePrice: Int
    cakeDescription: String
    cakeImage: String
  }

    type Query {
    users: [User]
    user(username: String!): User
    cakes: [Cake]
    cake(cakeID: ID!): Cake
    me: User
  }



    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    logout: Logout
    # add cake use cakeInput
    addCake(cakeInput: CakeInput): Cake
    # add cake to user
    addCakeToUser(cakeId: ID!): User
    # remove cake from user
    removeCakeFromUser(cakeId: ID!): User
  }
`;

module.exports = typeDefs;
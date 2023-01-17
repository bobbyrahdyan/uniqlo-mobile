const { gql } = require("graphql-tag");
const axios = require("axios");
const Redis = require("ioredis");
const { GraphQLError } = require('graphql');
const baseUrl = "http://localhost:4001";

const redis = new Redis({
  host: "redis-19863.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 19863,
  password: "BhWyYUYSgtYQCAFuNLvTF1I4IjZs7gqh",
});

const typeDefs = gql`
  type User {
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  input UserInput {
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  type Mutation {
    addUser(newUser: UserInput): User
    deleteUser(id: String): User
  }

  type Query {
    readAllUser: [User]
  }
`;

const resolvers = {
  Query: {
    readAllUser: async () => {
      try {
        const userCache = await redis.get("users");
        // await redis.del("users");
        if (userCache) {
          return JSON.parse(userCache);
        }
        const { data } = await axios.get(baseUrl);
        return data.data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
  },
  Mutation: {
    addUser: async (_, { newUser }) => {
      try {
        await axios.post(baseUrl + "/register", newUser);
        const userCache = await redis.get("users");

        if (userCache) {
          newUser.role = "admin";
          const cache = JSON.parse(userCache).push(newUser);
          await redis.set("users", JSON.stringify(cache));
        }
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await axios.delete(baseUrl + "/" + id);
        const userCache = await redis.get("users");
        if (userCache) {
          const cache = JSON.parse(userCache).filter((el) => el.id !== id);
          await redis.set("users", JSON.stringify(cache));
        }
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
  },
};

module.exports = { typeDefs, resolvers };

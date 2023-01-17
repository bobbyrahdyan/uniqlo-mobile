const { gql } = require("graphql-tag");
const axios = require("axios");
const Redis = require("ioredis");
const { GraphQLError } = require('graphql');
const baseUrl = "http://localhost:4002/products";

const redis = new Redis({
  host: "redis-19863.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 19863,
  password: "BhWyYUYSgtYQCAFuNLvTF1I4IjZs7gqh",
});

const typeDefs = gql`
  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: String
    Category: Category
    Images: [Image]
    User: User
  }

  type Category {
    name: String
  }

  type Image {
    imgUrl: String
  }

  type User {
    username: String
  }

  input ProductInput {
    name: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: String
  }

  input ImageInput {
    id: Int
    imgUrl: String
  }

  type Mutation {
    addProduct(product: ProductInput, images: [ImageInput]): Product
    updateProduct(id: ID, product: ProductInput, images: [ImageInput]): Product
    deleteProduct(id: ID): Product
  }

  type Query {
    readAllProducts: [Product]
    readDetailProduct(id: ID): Product
  }
`;

const resolvers = {
  Query: {
    readAllProducts: async () => {
      try {
        const productCache = await redis.get("products");
        if (productCache) {
          return JSON.parse(productCache);
        }
        const { data } = await axios.get(baseUrl);

        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    readDetailProduct: async (_, { id }) => {
      try {
        const productCache = await redis.get("products");

        if (productCache) {
          return JSON.parse(productCache).filter((el) => el.id === +id)[0];
        }

        const { data } = await axios.get(baseUrl + "/" + id);
        const { data: user } = await axios.get(
          "http://localhost:4001" + "/" + data.authorId
        );
        data.User = user.data;
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const { data } = await axios.post(baseUrl, args);
        const productCache = await redis.get("products");

        if (productCache) {
          const cache = JSON.parse(productCache).unshift(data.data);
          await redis.set("products", cache);
        }
        return data.data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    updateProduct: async (_, args) => {
      try {
        const { id } = args;
        delete args.id;
        const { data } = await axios.put(baseUrl + "/" + id, args);
        const productCache = await redis.get("products");
        if (productCache) {
          const cache = JSON.parse(productCache);
          const idx = cache.map((el) => el.id).indexOf(id);
          for (const key in data.data) {
            cache[idx][key] = data.data[idx];
          }
          await redis.set("products", cache);
        }
        return data.data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { id } = args;
        await axios.delete(baseUrl + "/" + id);
        const productCache = await redis.get("products");

        if (productCache) {
          const cache = JSON.parse(productCache).filter((el) => el.id !== +id);
          await redis.set("products", cache);
        }
        return;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: { code: error.response.status },
        });
      }
    },
  },
};

module.exports = { typeDefs, resolvers };

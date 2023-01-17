const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone');
const { product, user } = require("./schema");

const server = new ApolloServer({
  typeDefs: [product.typeDefs, user.typeDefs],
  resolvers: [product.resolvers, user.resolvers],
  introspection: true,
  playground: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  })
  .then(({ url })=>{
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error) => {
    console.log(error);
  })

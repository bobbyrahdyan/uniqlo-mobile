import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://uniqlo-docker.foxhub.space",
    // uri: "http://192.168.18.205:4000",
    cache: new InMemoryCache(),
});

export default client;

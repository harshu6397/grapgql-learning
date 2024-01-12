import { ApolloServer } from "@apollo/server";
import { User } from "./user";


async function createApolloServer() {
    const server = new ApolloServer({
        typeDefs: `#graphql 
            ${User.typeDefs}
        `,
        resolvers: {
            ...User.resolvers,
        },
    });
    await server.start();
    return server;
}

export default createApolloServer;
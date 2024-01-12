import { queries } from "./queries";
import { mutations } from "./mutations";

export const typeDefs = `#graphql
    type User {
        name: String!
        email: String!
        password: String!
    }

    type Response {
        message: String!
        success: Boolean!
        accessToken: String
        data: User
    }

    type Query {
        ${queries}
    }

    type Mutation {
        ${mutations}
    }
`;
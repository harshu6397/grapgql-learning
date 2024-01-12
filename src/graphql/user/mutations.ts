export const mutations = `#graphql
    createUser(name: String!, email: String!, password: String!): Response!
    login(email: String!, password: String!): Response!
`;
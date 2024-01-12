import prismaClient from "../../lib/db"
import { User, loginPayload } from "../../services/user/interfaces"
import UserService from "../../services/user/user"

const queries = {
    hello: () => 'Hello World!',
    sayName: (parent: any, { name }: { name: String }) => `Hello ${name}!`,
    getUsers: async () => await UserService.getUsers(),
    getUser: async (_: any, __: any, {req}: any) => {
        return await UserService.getUser(req.userId);
    }
}

const mutations = {
    createUser: async (parent: any, payload: User, { req }: any) => {
        try {
            console.log(req);

            if (!payload.name || !payload.email || !payload.password) {
                return {
                    message: 'Invalid input',
                    success: false,
                    data: null
                }
            }

            const data = await UserService.createUser({ name: payload.name, email: payload.email, password: payload.password })

            return {
                message: data.message,
                success: true,
                accessToken: data.accessToken,
                data: data.user
            }
        } catch (error) {
            console.log(error)
            return {
                message: 'Something went wrong',
                success: false,
                data: null
            }
        }
    },

    login: async (parent: any, payload: loginPayload) => {
        try {
            if (!payload.email || !payload.password) {
                return {
                    message: 'Invalid input',
                    success: false,
                    data: null
                }
            }

            const data = await UserService.login({ email: payload.email, password: payload.password })

            return {
                message: data.message,
                success: data.success,
                accessToken: data.accessToken,
                data: data.data
            }
        } catch (error) {
            console.log(error)
            return {
                message: 'Something went wrong',
                success: false,
                data: null
            }
        }
    }
}

export const resolvers = {
    Query: queries,
    Mutation: mutations
}
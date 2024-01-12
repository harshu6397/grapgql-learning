import { comparePassword, generateToken, hashPassword } from "../../helpers";
import prismaClient from "../../lib/db";
import { User, loginPayload } from "./interfaces";
import JWT from 'jsonwebtoken';

class UserService {
    public static async createUser(payload: User) {
        try {
            const newUser = await prismaClient.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    password: hashPassword(payload.password)
                }
            })

            const accessToken = generateToken({ id: newUser.id });

            return {
                message: 'User created successfully',
                success: true,
                user: newUser,
                accessToken
            }

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    private static async getUserByEmail(email: string) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email
                }
            })

            return user ? user : null;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public static async login(payload: loginPayload) {
        try {
            const user = await this.getUserByEmail(payload.email);
            if (!user) {
                return {
                    message: 'User not found',
                    success: false,
                    data: null
                }
            }

            const isPasswordValid = comparePassword(payload.password as string, user.password);

            if (!isPasswordValid) {
                return {
                    message: 'Invalid password',
                    success: false,
                    data: null
                }
            }

            const accessToken = generateToken({ id: user.id });

            return {
                message: 'Login successful',
                success: true,  
                accessToken,
                data: user
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

    public static async getUsers() {
        try {
            const users = await prismaClient.user.findMany()

            return users
        } catch (error) {
            console.log(error)
            return []
        }
    }   

    public static async getUser(id: String) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: parseInt(id as string)
                }
            })

            return user 
        } catch (error) {
            console.log(error)
            return null
        }
    }

    public static decodeToken(token: string): any {
        return JWT.verify(token, "secret");
    }
}

export default UserService;
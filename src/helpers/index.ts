import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = (password: string): string => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const comparePassword = (password: string, hash: string) => {
    try {
        return bcrypt.compareSync(password, hash);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const generateToken = (payload: any) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'secret', { expiresIn: '1d' });
    } catch (error) {
        console.log(error)
        throw error;
    }
}
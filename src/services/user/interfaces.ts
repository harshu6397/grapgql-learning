export interface User {
    name: string;
    email: string;
    password: string;
}

export interface loginPayload {
    email: string;
    password: string;
}
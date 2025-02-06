export interface User {
    id_user?: string | number;
    name: string;
    email: string;
    password?: string | any;
    createdAt?: string;
    updatedAt?: string;
    active?: boolean;
}
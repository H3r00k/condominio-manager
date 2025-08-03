export interface User{
    id: string;
    name: string;
    subname: string;
    email: string;
    villetta: string;
    password: string;
    role: 'user' | 'admin';
}

export type NewUser = Omit<User, 'id' | 'role'>;
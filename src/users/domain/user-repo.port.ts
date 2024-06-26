import { User } from "./user.aggregate";

export interface UserRepositoy {
    save(user: User): Promise<void>;
    findUserById(id: string): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    exists(email: string): Promise<boolean>;
}
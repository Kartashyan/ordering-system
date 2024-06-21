import { User } from "./user.aggregate";

export interface UserRepositoy {
    save(user: User): Promise<void>;
    find(id: string): Promise<User>;
    exists(id: string): Promise<boolean>;
}
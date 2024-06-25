import { Result } from "../../shared";
import { UserRepositoy } from "../domain/user-repo.port";
import { User } from "../domain/user.aggregate";

export class SignupUseCase {
    constructor(userRepo: UserRepositoy) {
        this.userRepo = userRepo;
    }
    async execute(command: any) {
        const user = User.create(command.email, command.password);
        await this.userRepo.save(user);
        return Result.ok();
    }
}
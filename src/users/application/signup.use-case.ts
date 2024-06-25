import { Result } from "../../shared";
import { Email } from "../domain/email.value-object";
import { Password } from "../domain/password.value-object";
import { Role } from "../domain/role.value-object";
import { Status } from "../domain/status.value-object";
import { UserRepositoy } from "../domain/user-repo.port";
import { User } from "../domain/user.aggregate";

export interface CommandDTO {
    email: string;
    password: string;
    role: string;
    status: string;
}

export class SignupUseCase {
    constructor(private userRepo: UserRepositoy) {
        this.userRepo = userRepo;
    }
    async execute(command: CommandDTO): Promise<Result<void>> {

        const emailOrError = Email.create(command.email);
        const passwordOrError = Password.create(command.password);
        const roleOrError = Role.create(command.role);
        const statusOrError = Status.create(command.status);

        const userPropsError = Result.combine([emailOrError, passwordOrError, roleOrError, statusOrError]);

        if (userPropsError.isFail()) {
            return Result.fail("Invalid user properties");
        }

        const userProps = {
            email: emailOrError.value(),
            password: passwordOrError.value(),
            role: roleOrError.value(),
            status: statusOrError.value(),
        };
        
        const user = User.create(userProps);
        await this.userRepo.save(user);
        return Result.Ok();
    }
}
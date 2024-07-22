import { ok, fail, Result } from "../../shared";
import { DomainError } from "../../shared/core/domain-error";
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
        try {
            const email = Email.create(command.email);
            const password = Password.create(command.password);
            const role = Role.create(command.role);
            const status = Status.create(command.status);



            const userProps = {
                email,
                password,
                role,
                status,
            };

            const userExists = await this.userRepo.exists(userProps.email.value);

            if (userExists) {
                return fail("[signup.use-case]: User with this email already exists");
            }

            const user = User.create(userProps);
            await this.userRepo.save(user);
            return ok(undefined);
        } catch (error) {
            if (error instanceof DomainError) {
                return fail(`[signup.use-case]: ${error.message}`);
            } else if (error instanceof Error) {
                return fail(`[signup.use-case]: ${error.message}`);
            }  else {
                throw error;
            }

        }
    }
}
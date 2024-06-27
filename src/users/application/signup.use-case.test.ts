import { SignupUseCase, CommandDTO } from "./signup.use-case";
import { UserRepositoy } from "../domain/user-repo.port";
import { Result } from "../../shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("SignupUseCase", () => {
    let userRepo: UserRepositoy;
    let signupUseCase: SignupUseCase;

    beforeEach(() => {
        userRepo = {
            exists: vi.fn(),
            findUserByEmail: vi.fn(),
            findUserById: vi.fn(),
            save: vi.fn(),
        };
        signupUseCase = new SignupUseCase(userRepo);
    });

    it("should fail if user already exists", async () => {
        const command: CommandDTO = {
            email: "test@example.com",
            password: "password123",
            role: "user",
            status: "active",
        };
        vi.spyOn(userRepo, "exists").mockImplementation(async () => true);

        const result = await signupUseCase.execute(command);
        expect(result.error()).toContain("[signup.use-case]: User with this email already exists")
        expect(result.isFail).toBeTruthy();
    });

    it("should fail if provided email is invalid", async () => {
        const command: CommandDTO = {
            email: "test@example.com",
            password: "pass",
            role: "user",
            status: "active",
        };

        const result: Result<void> = await signupUseCase.execute(command);

        expect(result.isFail()).toBe(true);
        expect(result.error()).toContain("[signup.use-case]: Invalid user properties");
    })

    it("should fail if provided password is too short", async () => {
        const command: CommandDTO = {
            email: "test@example.com",
            password: "pass",
            role: "user",
            status: "active",
        };

        const result: Result<void> = await signupUseCase.execute(command);

        expect(result.isFail()).toBe(true);
        expect(result.error()).toContain("[signup.use-case]: Invalid user properties");
    });

    it("should return an error if email is invalid", async () => {

        const command: CommandDTO = {
            email: "invalid-email",
            password: "password123",
            role: "user",
            status: "active",
        };


        const result: Result<void> = await signupUseCase.execute(command);


        expect(result.isFail()).toBe(true);
        expect(result.error()).toContain("[signup.use-case]: Invalid user properties");
    });

    it.skip("should create a new user", async () => {
        // Arrange
        const command: CommandDTO = {
            email: "test@example.com",
            password: "password123",
            role: "user",
            status: "active",
        };

        // Act
        const result: Result<void> = await signupUseCase.execute(command);

        // Assert
        expect(result.isOk()).toBe(true);
        // Additional assertions for verifying the user creation
    });

});
import { User, UserProps } from './user.aggregate';
import { Email } from './email.value-object';
import { Password } from './password.value-object';
import { Role } from './role.value-object';
import { Status } from './status.value-object';
import { describe, expect, it } from 'vitest';
import { UserCreatedEvent } from './events/user-created.event';

describe('User', () => {
    const userProps: UserProps = {
        email: Email.create('test@example.com'),
        password: Password.create('securePassword123'),
        role: Role.create('admin'),
        status: Status.create('active'),
    };

    describe('create method', () => {
        it('should successfully create a user', () => {
            const user = User.create(userProps);
            expect(user).toBeInstanceOf(User);
        });

        it('should add a UserCreatedEvent if no ID is provided', () => {
            const user = User.create(userProps);
            // Assuming UserCreatedEvent import is missing, it should be imported at the top.
            expect(user.domainEvents.length).toBe(1);
            expect(user.domainEvents[0]).toBeInstanceOf(UserCreatedEvent);
        });
    });
});

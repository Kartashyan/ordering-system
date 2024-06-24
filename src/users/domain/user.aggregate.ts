
import { Aggregate, ID } from "../../shared";
import { Email } from "./email.value-object";
import { Password } from "./password.value-object";
import { Role } from "./role.value-object";
import { Status } from "./status.value-object";

type UserProps = {
    email: Email;
    password: Password;
    role: Role;
    status: Status;
    };

export class User extends Aggregate<UserProps> {
  private _email: Email;
  private _password: Password;
  private _role: Role;
  private _status: Status;

  private constructor(props: UserProps, id?: ID) {
    super(props, id);
    this._email = props.email;
    this._password = props.password;
    this._role = props.role;
    this._status = props.status;
  }

  public get email(): Email {
    return this._email;
  }

  public get password(): Password {
    return this._password;
  }

  public get role(): Role {
    return this._role;
  }

  public get status(): Status {
    return this._status;
  }

  public static create(
    email: string,
    password: string,
    role: string,
    status: string,
    createdOn: Date,
    updatedOn: Date,
    lastLogin: Date,
    id?: ID
  ): User {
    return new User(
      {
        email: Email.create(email),
        password: Password.create(password),
        role: Role.create(role),
        status: Status.create(status),
      },
      id
    );
  }
}
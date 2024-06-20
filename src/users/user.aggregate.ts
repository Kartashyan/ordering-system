import { Aggregate, ID } from "../shared/lib";
import { Email } from "./email.value-object";
import { Password } from "./password.value-object";
import { Role } from "./role.value-object";
import { Status } from "./status.value-object";

type UserProps = {
    email: Email;
    password: Password;
    role: Role;
    status: Status;
    createdOn: Date;
    updatedOn: Date;
    lastLogin: Date;
    };

export class UserAggregate extends Aggregate<UserProps> {
  private _email: Email;
  private _password: Password;
  private _role: Role;
  private _status: Status;
  private _createdOn: Date;
  private _updatedOn: Date;
  private _lastLogin: Date;

  private constructor(props: UserProps, id?: ID) {
    super(props, id);
    this._email = props.email;
    this._password = props.password;
    this._role = props.role;
    this._status = props.status;
    this._createdOn = props.createdOn;
    this._updatedOn = props.updatedOn;
    this._lastLogin = props.lastLogin;
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

  public get createdOn(): Date {
    return this._createdOn;
  }

  public get updatedOn(): Date {
    return this._updatedOn;
  }

  public get lastLogin(): Date {
    return this._lastLogin;
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
  ): UserAggregate {
    return new UserAggregate(
      {
        email: Email.create(email),
        password: Password.create(password),
        role: Role.create(role),
        status: Status.create(status),
        createdOn,
        updatedOn,
        lastLogin,
      },
      id
    );
  }
}
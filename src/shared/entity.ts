
import { UniqueID } from './UniqueID';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueID;
  public readonly props: T;

  constructor (props: T, id?: UniqueID) {
    this._id = id ? id : UniqueID.create();
    this.props = props;
  }

  public equals (object?: Entity<T>) : boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
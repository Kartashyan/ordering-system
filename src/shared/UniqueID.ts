export class UniqueID {
    private _id: string;
    private _isNew: boolean;
    
    private constructor(id?: string) {
        this._id = id ? id : crypto.randomUUID();
        this._isNew = !id;
    }
    
    get value() {
        return this._id;
    }

    get isNew() {
        return this._isNew;
    }
    
    static create(id?: string) {
        return new UniqueID(id);
    }
    
    equals(id?: UniqueID) {
        if (id === null || id === undefined) {
        return false;
        }
        return this._id === id._id;
    }
}
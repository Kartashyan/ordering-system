export class UniqueID {
    private _id: string;
    
    private constructor(id: string) {
        this._id = id;
    }
    
    get value() {
        return this._id;
    }
    
    static create(id?: string) {
        return new UniqueID(id ? id : crypto.randomUUID());
    }
    
    equals(id?: UniqueID) {
        if (id === null || id === undefined) {
        return false;
        }
        return this._id === id._id;
    }
}
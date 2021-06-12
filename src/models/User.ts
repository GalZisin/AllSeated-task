import Position from './Position'

export default class User {
    _id: string;
    _position: Position
    _rotation: number;

    constructor(id: string, x: number, y: number, z: number, rotation: number) {
        this._id = id;
        this._position = new Position(x, y, z)
        this._rotation = rotation;
    }
    get id() {
        return this._id;
    }
    get x() {
        return this._position._x;
    }
    get y() {
        return this._position._y;
    }
    get z() {
        return this._position._z;
    }
    get rotation() {
        return this._rotation;
    }
}
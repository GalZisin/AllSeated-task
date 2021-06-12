import Position from '../models/Position'

export default interface IUser {
    _id: string;
    _position: Position
    _rotation: number;
}
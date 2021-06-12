import User from '../models/User'
import IUser from '../types/types'

export default class SingletonArray {

    private static _instance: SingletonArray;

    private usersDataArray: IUser[] = [];

    private constructor() { }

    static getInstance() {
        if (!this._instance) {
            this._instance = new SingletonArray();
        }

        return SingletonArray._instance;
    }

    public getArray(): IUser[] {
        return this.usersDataArray;
    }
    //Add and Update user in array
    public setArray = (user: IUser): void => {
        //remove existing user from array
        for (let i = 0; i < this.usersDataArray.length; i++) {
            if (user._id === this.usersDataArray[i]._id) {
                this.usersDataArray.splice(i, 1);
                console.log("deleted i: " + i + "user id: " + user._id);
                break;
            }
        }
        //Add new User
        this.add(user);
    }
    //Add user into array, sorted by x coordinate
    public add = (user: IUser): void => {
        if (this.usersDataArray.length === 0) {
            this.usersDataArray.push(user);
            console.log("insert first user id: " + user._id);
            return;
        }
        let isInserted: boolean = false;
        for (let i = 0; i < this.usersDataArray.length; i++) {

            if (user._position._x < this.usersDataArray[i]._position._x) {
                if (i === 0) {
                    this.usersDataArray.unshift(user);
                    console.log("unshift user id: " + user._id);
                } else {
                    this.usersDataArray.splice(i, 0, user)
                    console.log("splice user i: " + i + "user id" + user._id);
                }
                isInserted = true;
                break;

            }
        }
        if (!isInserted) {
            this.usersDataArray.push(user);
            console.log("push user id: " + user._id);
        }
    }
    //Get users by distance
    public getByDistance = (user: IUser, distance: number, maxUsers: number): IUser[] => {

        console.log("getByDistance user id: " + user._id);
        let dxd = distance * distance;
        if (this.usersDataArray.length < 2) return [];
        return this.getByDistancer(user, dxd, 0, this.usersDataArray.length - 1, maxUsers);
    }
    //Get users by distance using recursion
    //The routine check middle position of array part (from position to posiotion).
    //If middle position does not meet the distance requirements it definiens direction for next search 
    //and calls the program recursively using new values for fromPos, toPos.
    //If middle position meets the distance requirements it selects appropriate users on left and right direction from
    //the middle position.
    private getByDistancer = (user: IUser, sqrDistance: number, fromPos: number, toPos: number, maxUsers: number): IUser[] => {
        console.log("getByDistancer fromPos: " + fromPos + "toPos: " + toPos);
        let inew: IUser[] = [];
        let xd1 = 0;
        let yd = 0;
        let zd = 0;
        if (toPos - fromPos <= 5) {
            for (let i = fromPos; i <= toPos; i++) {
                if (this.usersDataArray[i]._id != user._id) {
                    xd1 = this.usersDataArray[i]._position._x - user._position._x;
                    xd1 = xd1 * xd1;
                    console.log("xd1: " + xd1 + " user id: " + this.usersDataArray[i]._id)
                    if (sqrDistance >= xd1) {
                        yd = this.usersDataArray[i]._position._y - user._position._y;
                        zd = this.usersDataArray[i]._position._z - user._position._z;
                        xd1 = xd1 + yd * yd + zd * zd;
                        console.log("finish distance xd1: " + xd1)
                        if (sqrDistance >= xd1) {
                            inew.push(this.usersDataArray[i])
                            if (inew.length >= maxUsers) return inew;
                        }
                    }
                }
            }
            return inew;
        }
        let indexPos: number = 1;
        if (toPos - fromPos == 1) {
            indexPos = 1;
        } else {
            indexPos = Math.floor((toPos - fromPos) / 2);
        }
        console.log("indexPos after divide= " + indexPos)
        //check position
        if (this.usersDataArray[indexPos]._id == user._id) {
            console.log("found current user ")
            if (indexPos + 1 >= toPos)
                indexPos--;
            else
                indexPos++;
        }
        console.log("indexPos: " + indexPos + "user id:  " + this.usersDataArray[indexPos]._id);
        let xd = this.usersDataArray[indexPos]._position._x - user._position._x;
        xd = xd * xd;
        if (sqrDistance < xd) {
            if (toPos - fromPos == 1) return [];

            let indexPos1 = indexPos + 1;
            let dx1 = 0;
            let selectedRight: boolean = false;
            while (indexPos1 < toPos) {
                dx1 = this.usersDataArray[indexPos1]._position._x - user._position._x;
                dx1 = dx1 * dx1;
                if (dx1 != xd) {
                    if (dx1 < xd) {
                        selectedRight = true;
                    }
                    break;
                }
                indexPos1++;
            }
            if (selectedRight) {
                console.log("selected right: ");
                return this.getByDistancer(user, sqrDistance, indexPos1, toPos, maxUsers);
            }
            else {
                console.log("selected left: ");
                return this.getByDistancer(user, sqrDistance, fromPos, indexPos, maxUsers);
            }
        }
        else {
            let getCurrentUser: boolean = true;
            let pp = indexPos;
            console.log("found user: " + this.usersDataArray[indexPos]._id + "sqrDelta: " + xd);
            inew.push(new User(this.usersDataArray[indexPos]._id, this.usersDataArray[indexPos]._position._x, this.usersDataArray[indexPos]._position._y, this.usersDataArray[indexPos]._position._z, this.usersDataArray[indexPos]._rotation))
            //go right
            while (getCurrentUser && pp <= toPos) {
                pp++;
                if (pp > toPos) {
                    getCurrentUser = false;
                    break;
                }
                if (this.usersDataArray[pp]._id != user._id) {
                    xd = this.usersDataArray[pp]._position._x - user._position._x;

                    xd = xd * xd;
                    if (sqrDistance >= xd) {
                        yd = this.usersDataArray[pp]._position._y - user._position._y;
                        zd = this.usersDataArray[pp]._position._z - user._position._z;
                        xd = xd + yd * yd + zd * zd;
                        if (sqrDistance >= xd) {
                            inew.push(this.usersDataArray[pp])
                            if (inew.length >= maxUsers) return inew;
                        }
                    }
                    else
                        getCurrentUser = false;
                }
            }
            //go left
            pp = indexPos;
            getCurrentUser = true;
            while (getCurrentUser && pp >= fromPos) {
                pp--;
                if (pp < fromPos) {
                    getCurrentUser = false;
                    break;
                }
                if (this.usersDataArray[pp]._id != user._id) {
                    xd = this.usersDataArray[pp]._position._x - user._position._x;
                    xd = xd * xd;
                    if (sqrDistance >= xd) {
                        yd = this.usersDataArray[pp]._position._y - user._position._y;
                        zd = this.usersDataArray[pp]._position._z - user._position._z;
                        xd = xd + yd * yd + zd * zd;
                        if (sqrDistance >= xd) {
                            inew.push(this.usersDataArray[pp])
                            if (inew.length >= maxUsers) return inew;
                        }
                    }
                    else
                        getCurrentUser = false;
                }
            }
            return inew;
        }

    }
}
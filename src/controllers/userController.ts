import { Request, Response, NextFunction } from 'express';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import SingletonArray from '../singleton/singleton'
import SingletonRunner from '../singleton/singletonRunner'
import User from '../models/User'

export const getUsers = catchAsyncErrors(async (req: any, res: any, next: NextFunction): Promise<Response | void> => {

    const id = req.query.id;
    const x1 = req.query.x;
    const y1 = req.query.y;
    const z1 = req.query.z;
    const rotation = req.query.rotation;
    const distance = req.query.distance;
    const maxUsers = req.query.maxUsers;
    console.log("x1: " + x1 + " y1:" + y1 + " z1: " + z1);

    const user = new User(id, x1, y1, z1, rotation);

    let array = [];

    const sRunner = new SingletonRunner();

    await sRunner.userOperation(user, distance, maxUsers);
    array = sRunner.array;

    console.log("Result array: " + JSON.stringify(array))

    res.status(200).json({
        success: true,
        array
    })

})
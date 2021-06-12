import { Request, Response, NextFunction } from "express";

export default (func: any) => (req: any, res: any, next: NextFunction): Promise<Response | void> =>
    Promise.resolve(func(req, res, next))
        .catch(next);
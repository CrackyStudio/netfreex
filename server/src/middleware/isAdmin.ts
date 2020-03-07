import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

export const isAdmin = async (_req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.id;

    let user: User;
    try {
        user = await User.findOne({ where: {
            id
        }});
    } catch (id) {
        res.status(401).send();
    }

    if (user.role === "admin") next();
    else res.status(401).send();
};
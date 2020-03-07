import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["auth"];
    let jwtPayload: any;
    
    try {
        jwtPayload = <any>jwt.verify(token, JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    const { id, nickname } = jwtPayload;
    const newToken = jwt.sign({ id, nickname }, JWT_SECRET, {
        expiresIn: "8h"
    });
    res.setHeader("token", newToken);
    
    next();
};
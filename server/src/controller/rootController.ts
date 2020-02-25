import { Request, Response } from "express";

export class RootController {
    public index(_req: Request, res: Response) {
        res.json({
            message: "Hello"
        });
    }
}
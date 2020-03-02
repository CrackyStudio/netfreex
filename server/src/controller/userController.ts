import Mail from "../services/mail";
import { Request, Response } from "express";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { User, UserInterface } from "../models/userModel";
import { authenticator } from 'otplib';

export class UserController {
    public index(_req: Request, res: Response) {
        User.findAll<User>({})
            .then((users: Array<User>) => res.json(users))
            .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const { GMAIL_DEST } = process.env;
        const params: UserInterface = req.body;
        params.secret = authenticator.generateSecret();

        User.create<User>(params)
            .then(async () => {
                const user = await User.findOne<User>({
                    where: { nickname: req.body.nickname }
                })

                const mail: Mail = new Mail(GMAIL_DEST, `Netfreex - Bienvenue ${user.nickname}`, `<pre>${JSON.stringify(user, null, 2)}</pre>`);
                mail.sendMail();

                res.status(201).json({
                    User: params.nickname,
                    Secret: user.secret,
                    Message: "Successfully created"
                })
            })
            .catch((err: Error) => res.status(500).json(err));
    }

    public show(req: Request, res: Response) {
        const key: string = req.params.key;
        const value: number | string = req.params.value || parseInt(req.params.value);

        User.findOne<User>({
            where: {[key]: value}
        })
        .then((user: User | null) => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ errors: ["User not found"] });
            }
        })
        .catch((err: Error) => res.status(500).json(err));
    }

    public update(req: Request, res: Response) {
        const userId: number = parseInt(req.params.id);
        const params: UserInterface = req.body;
    
        const update: UpdateOptions = {
            where: { id: userId },
            limit: 1
        };
        
        User.update(params, update)
            .then(() => res.status(202).json({ data: "success" }))
            .catch((err: Error) => res.status(500).json(err));
    }

    public delete(req: Request, res: Response) {
        const userId: number = parseInt(req.params.id);
        const options: DestroyOptions = {
            where: { id: userId },
            limit: 1
        };
    
        User.destroy(options)
            .then(() => res.status(204).json({ data: "success" }))
            .catch((err: Error) => res.status(500).json(err));
    }

    public validate(req: Request, res: Response) {
        const token: string = req.body.token;
        const secret: string = req.body.secret;

        if (!authenticator.check(token, secret)) {
            return res.status(401).json("2FA authorization failed")
        }

        res.status(200).json("2FA authorization succeded")
    }
}


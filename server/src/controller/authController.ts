import Mail from "../services/mail";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { authenticator } from "otplib";
import { sign } from "jsonwebtoken";

export class AuthController {
    public async register(req: Request, res: Response) {
        const { GMAIL_DEST } = process.env;
        const { nickname, password, role } = req.body;
        const secret = authenticator.generateSecret();

        try {
            const user = new User({
                nickname,
                secret,
                password,
                role: role === undefined ? "user" : "admin"
            });

            user.hashPassword();
            
            await user.save();

            const mail: Mail = new Mail(GMAIL_DEST, `Netfreex - Bienvenue ${user.nickname}`, `<pre>${JSON.stringify(user, null, 2)}</pre>`);
            mail.sendMail();

            res.status(201).json({
                User: user.nickname,
                Secret: user.secret
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async login(req: Request, res: Response) {
        const { JWT_SECRET } = process.env;
        const { nickname, password } = req.body;

        if (!(nickname && password)) {
            res.status(400).send();
        }

        let user: User;
        
        try {
            user = await User.findOne({ where: { nickname } });
        } catch (error) {
            res.status(401).send();
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }

        const token = sign(
        { 
            id: user.id, 
            nickname: user.nickname 
        },
        JWT_SECRET,
        { 
            expiresIn: "8h" 
        });

        res.send(token);
    }
}
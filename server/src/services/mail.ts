import * as nodemailer from "nodemailer"

export default class Mail {
    to: string;
    subject: string;
    message: string;

    constructor (to: string, subject: string, message: any) {
        this.to = to;
        this.subject = subject;
        this.message = message;
    }

    sendMail() {

        const mailOptions = {
            from : process.env.GMAIL_USER,
            to: this.to,
            subject: this.subject,
            html: this.message
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("L'email a été envoyé avec succès");
            }
        });
    }
}
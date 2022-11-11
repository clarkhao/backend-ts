import nodemailer from 'nodemailer';

class Mailer {
    private static instance: Mailer;
    private mailer: nodemailer.Transporter;
    private  constructor() {
        this.mailer = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'clark123', // generated ethereal user
              pass: '123456', // generated ethereal password
            },
          })
    }
    static getInstance() {
        if(!Mailer.instance) {
            Mailer.instance = new Mailer();
        }
    }
    async sendMail(to:string, content:string) {
        return this.mailer.sendMail({
            from: 'clark',
            to: to,
            subject: 'hello',
            text: 'hello world',
            html: content
        })
    }
}

const mailer = Mailer.getInstance();

export {mailer, Mailer};
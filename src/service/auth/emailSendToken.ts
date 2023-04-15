import {db, Mailer} from '../../utils';
import Mail from 'nodemailer/lib/mailer';
import { Authorization } from '../../model';
import { stat } from 'fs';
const config = require('config');

const sendEmailWithToken = async (email: string, id:number) => {
    const token = (new Authorization(id,db)).generateToken('120s','RESEND');
    const mailer = new Mailer();
    const url = config.get('server.host')?.concat(`:${process.env[config.get('server.port')]}`)
        .concat(`/signup/auth/email?code=${token}`);
    return mailer.sendMail(email, `注册确认`, 
    `<div>
    please click the following url
    <a href="${url}">${url}</a>
    </div>`)
    .then(info => {
        const status = parseInt(info.response.split(' ')[0]);
        if(status >= 200 && status < 300)
            return Promise.resolve(true);
        else
            return Promise.reject('404 failed to send email.')
    }); 
}

export {sendEmailWithToken};
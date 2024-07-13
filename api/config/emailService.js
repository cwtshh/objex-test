const nodemailer = require('nodemailer');
const email = process.env.nodemailer_email;
const pass = process.env.nodemailer_pass;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass,
    }
});

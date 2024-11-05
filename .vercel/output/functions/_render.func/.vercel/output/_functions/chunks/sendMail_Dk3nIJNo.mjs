import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// const nodemailer = require('nodemailer') //importacion comonjs
config({ path: '../../../.env'});
// const path = require("path");






//Configurar el envio (ya lo hago con mailoptions que viene del FormReact.jsx)
({
    from: {
        name: 'Genius Bar',
        address: process.env.USER_GMAIL
    }, // sender address
    to: ["tecnorosativentas@gmail.com", "manofspotify986@gmail.com", "juanjosemorales1986@hotmail.com"], // list of receivers
    subject: "Email enviado usando nodemailer y gmail", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [
        {
            filename: 'test.pdf',
            path: '../../Pruebas/test.pdf.pdf',
            contenType: 'application/pdf'
        },
        {
            filename: 'sample_jpg',
            path: '../../Pruebas/sample_jpg.jpg',
            contenType: 'image/jpg'
        },
    ]
});

async function sendMail(mailOptions, usergmail, usergmailp) {
    const transporter = nodemailer.createTransport({
        //Configurar los detalles del servicio de correo
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: 'false', // true para el puerto 465, false par otros puertos
        auth: {
            user: usergmail,
            pass: usergmailp,
        }
    });

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email has been send!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

//sendMail(transporter, sendMailOptions)

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    sendMail
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, sendMail as s };

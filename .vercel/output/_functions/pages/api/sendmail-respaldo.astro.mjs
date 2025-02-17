import nodemailer from 'nodemailer';
import { config } from 'dotenv';
export { renderers } from '../../renderers.mjs';

// const nodemailer = require('nodemailer') //importacion comonjs
config({ path: '../../../.env'});
// const path = require("path");



const transporter = nodemailer.createTransport({
    //Configurar los detalles del servicio de correo
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: 'false', // true para el puerto 465, false par otros puertos
    auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_APP_GMAIL,
    }
});

//Configurar el envio
const sendMailOptions = {
    from: {
        name: 'Genius Bar',
        address: process.env.USER_GMAIL
    }, // sender address
    to: ["tecnorosativentas@gmail.com", "manofspotify986, juanjosemorales1986@hotmail.com"], // list of receivers
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
};

const sendMail = async (transporter, sendMailOptions ) => {
    try {
        await transporter.sendMail(sendMailOptions);
        console.log('Email has been send!');
    } catch (error) {
        console.error(error);
    }
};

sendMail(transporter, sendMailOptions);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

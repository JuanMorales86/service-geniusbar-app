// const nodemailer = require('nodemailer') //importacion comonjs
import nodemailer from "nodemailer";
// require('dotenv').config({ path: '../../../.env'})  //importacion comonjs
import { config } from "dotenv"; //importacion tipo ES no comonjs
config({ path: "../../../.env" });
// const path = require("path");

//Configurar el envio (ya lo hago con mailoptions que viene del FormReact.jsx)
// const sendMailOptions = {
//     from: {
//         name: 'OnthePointService',
//         address: process.env.USER_GMAIL
//     }, // sender address
//     to: ["tecnorosativentas@gmail.com", "manofspotify986@gmail.com", "onthepointservice@gmailcom"], // list of receivers
//     subject: "Email enviado usando nodemailer y gmail", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//     attachments: [
//         {
//             filename: 'test.pdf',
//             path: '../../Pruebas/test.pdf.pdf',
//             contenType: 'application/pdf'
//         },
//         {
//             filename: 'sample_jpg',
//             path: '../../Pruebas/sample_jpg.jpg',
//             contenType: 'image/jpg'
//         },
//     ]
// }

export async function sendMail(
  mailOptions,
  usergmail,
  usergmailp,
  accountsmptservice,
  accountsmpthost,
  accountsmptport,
  accountsmptsecure
) {
  const transporter = nodemailer.createTransport({
    //Configurar los detalles del servicio de correo
    service: accountsmptservice,
    host: accountsmpthost,
    port: accountsmptport,
    secure: accountsmptsecure, // true para el puerto 465, false par otros puertos
    auth: {
      user: usergmail,
      pass: usergmailp,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been send!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

//sendMail(transporter, sendMailOptions)

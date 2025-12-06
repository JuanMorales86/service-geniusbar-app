//Src/pages/api/submitForm.ts
//Manejador de POST del formulario de cosulta de repracion del cliente
//Esta API guardara los datos en la base de datos y submitForm.ts

import type { APIContext } from "astro";

//import { db, Usermsj } from "astro:db";
import { sendMail } from "@/pages/api/sendMail";
import { generateId } from "lucia";
import { turdb } from "../../../db/turso";



export async function POST(context: APIContext) : Promise<Response> {
    const formData = await context.request.formData();
    const nombre = formData.get('nombre') as string;
    const modelo = formData.get('modelo') as string;
    const telefono = formData.get('telefono') as string;
    const email = formData.get('email') as string;
    const mensaje = formData.get('mensaje') as string;
    const opcionSeleccionada = formData.get('opcionSeleccionada') as string;
    const opcionDispositivo = formData.get('opcionDispositivo') as string;
    const {PASS_APP_GMAIL, USER_GMAIL,ACCOUNT_SMPT_HOST, ACCOUNT_SMPT_SERVICE, ACCOUNT_SMPT_PORT, ACCOUNT_SMPT_SECURE} = import.meta.env
    let usergmail = String(USER_GMAIL);
    // usergmail = USER_GMAIL
    let usergmailp = String(PASS_APP_GMAIL);
    // usergmailp = PASS_APP_GMAIL
    let accountsmptservice = String(ACCOUNT_SMPT_SERVICE)
    let accountsmpthost = String(ACCOUNT_SMPT_HOST);
    let accountsmptport = String(ACCOUNT_SMPT_PORT)
    let accountsmptsecure = String(ACCOUNT_SMPT_SECURE)

    const userGenerate = generateId(15)

    //Guardar en Base de datos
    try{
        

        await turdb.execute({
            sql:'INSERT INTO Usermsj (id, userId, nombre, modelo, telefono, email, mensaje, opcionSeleccionada, opcionDispositivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            args:[userGenerate, userGenerate, nombre, modelo, telefono, email, mensaje, opcionSeleccionada, opcionDispositivo]
        })

        //!el env si funciona aqui
        const mailOptions ={ 
            from: {
                name: `OnthePointService Servicio Tecnico Consulta Cliente: ${nombre}`,
                address: USER_GMAIL
            }, // sender address
            to: `onthepointservice@gmail.com, ${email}`, // list of receivers
            subject: "Confimacion de envío de la consulta", // Subject line
            text: "Hola ${nombre}, hemos recibido tu mensaje", // plain text body
            html: `
                <div style="font-family: apple, sans-serif; line-height: 1.6; text-align: center; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <img src="https://onthepointservice.com/img/onthepointservice.png" alt="Logo de onthepointservice" style="max-width: 150px; margin-bottom: 20px;">
                <h2 style="color: #333;">Servicio Técnico</h2>
                <p>Hola <strong>${nombre}</strong>:</p>
                <p><strong>Hemos recibido tu mensaje:</strong></p>
                <blockquote style="background-color: #fff; padding: 10px; border-left: 4px solid #ccc; margin: 20px 0;">${mensaje}</blockquote>
                <p><strong>Detalles de la consulta:</strong></p>
                <ul style="list-style-type: none; padding: 0; text-align: left; margin: 20px auto; max-width: 300px;">
                    <li><strong>Nombre:</strong> ${nombre}</li>   
                    <li><strong>Teléfono:</strong> ${telefono}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong> Tipo de Servicio:</strong> ${opcionSeleccionada}</li>
                    <li><strong>Modelo:</strong> ${opcionDispositivo}</li>
                    <li><strong>Identificador Numerico:</strong> ${modelo}</li>
                </ul>
                <p>Nos pondremos en contacto con usted a la brevedad.</p>
                <p>Gracias por elegir a OnthePointService.</p>
                <div style="margin-top: 40px;">
                <a href="https://onthepointservice.com" style="display: inline-block; padding:10px 20px; background-color: #101010; color: #fff; text-decoration: none; border-radius: 4px;">Visite nuestro sitio web</a>
                </div>

                </div>
            `}
        

        //Enviar correo electronico
        await sendMail(mailOptions, usergmail, usergmailp, accountsmptservice,
            accountsmpthost, accountsmptport, accountsmptsecure);


        // return new Response("Mensaje enviado correctamente", { status: 200 });
        return new Response(JSON.stringify({ success: true}),{
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
       
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        return new Response("Error al enviar el formulario", { status: 500 });
        }
    }
    

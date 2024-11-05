//Src/pages/api/submitForm.ts
//Manejador de POST del formulario de cosulta de repracion del cliente
//Esta API guardara los datos en la base de datos y submitForm.ts

import type { APIContext } from "astro";

import { db, Usermsj } from "astro:db";
import { sendMail } from "@/pages/api/sendMail";
import { generateId } from "lucia";
const cl = console.log.bind(console)


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
        await db.insert(Usermsj).values(
            {
            id: userGenerate,
            userId: userGenerate,
            nombre,
            modelo,
            telefono,
            email,
            mensaje,
            opcionSeleccionada,
            opcionDispositivo,
            }
        );

        //!el env si funciona aqui
        const mailOptions ={ 
            from: {
                name: `Genius Bar Servicio Tecnico Consulta Cliente: ${nombre}`,
                address: USER_GMAIL
            }, // sender address
            to: `geniusbarservices.ar@gmail.com, ${email}`, // list of receivers
            subject: "Confimacion de envío de la consulta", // Subject line
            text: "Hola ${nombre}, hemos recibido tu mensaje", // plain text body
            html: `
                <div style="font-family: apple, sans-serif; line-height: 1.6; text-align: center; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <img src="https://i.imgur.com/rrUbj7z.png" alt="Logo de Genius Bar" style="max-width: 200px; width:"60px";">
                <h2 style="color: #333;">Servicio Técnico</h2>
                <p>Hola <strong>${nombre}</strong>:</p>
                <p><strong>Hemos recibido tu mensaje:</strong></p>
                <blockquote style="background-color: #fff; padding: 10px; border-left: 4px solid #ccc; margin: 20px 0;">${mensaje}</blockquote>
                <p><strong>Detalles de la consulta:</strong></p>
                <ul style="list-style-type: none; padding: 0; tex-aling: left; margin: 20px auto; max-width: 300px;">
                    <li><strong>Nombre:</strong> ${nombre}</li>   
                    <li><strong>Teléfono:</strong> ${telefono}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong> Tipo de Servicio:</strong> ${opcionSeleccionada}</li>
                    <li><strong>Modelo:</strong> ${opcionDispositivo}</li>
                    <li><strong>Identificador Numerico:</strong> ${modelo}</li>
                </ul>
                <p>Nos pondremos en contacto con usted a la brevedad.</p>
                <p>Gracias por elegir a Genius Bar.</p>
                <div style="margin-top: 40px;">
                <a href="https://geniusbarserviciotecnico.com" style="display: inline-block; padding:10px 20px; background-color: #101010; color: #fff; text-decoration: none; border-radius: 4px;">Visite nuestro sitio web</a>
                </div>

                </div>
            `, // html body
            attachments: [
                {
                    filename: 'test.pdf',
                    path: '../../ASTRO/service-geniusbar-app/src/Pruebas/test.pdf.pdf',
                    contenType: 'application/pdf'
                },
                {
                    filename: 'sample_jpg',
                    path: '../../ASTRO/service-geniusbar-app/src/Pruebas/sample_jpg.jpg',
                    contenType: 'image/jpg'
                },
            ]
        }
        

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
    







/*APIContext es un tipo de Astro que se utiliza para crear endpoints de API en un proyecto de Astro. Cuando se utiliza en una función de endpoint, APIContext proporciona acceso a la solicitud entrante y a la respuesta saliente, lo que le permite a la función de endpoint manejar la solicitud y generar una respuesta adecuada. */
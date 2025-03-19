import { s as sendMail } from '../../chunks/sendMail_CynVUS0V.mjs';
import { generateId } from 'lucia';
import { t as turdb } from '../../chunks/turso_CdaR7E3F.mjs';
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
async function POST(context) {
  const formData = await context.request.formData();
  const nombre = formData.get("nombre");
  const modelo = formData.get("modelo");
  const telefono = formData.get("telefono");
  const email = formData.get("email");
  const mensaje = formData.get("mensaje");
  const opcionSeleccionada = formData.get("opcionSeleccionada");
  const opcionDispositivo = formData.get("opcionDispositivo");
  const { PASS_APP_GMAIL, USER_GMAIL, ACCOUNT_SMPT_HOST, ACCOUNT_SMPT_SERVICE, ACCOUNT_SMPT_PORT, ACCOUNT_SMPT_SECURE } = Object.assign(__vite_import_meta_env__, { USER_GMAIL: "juanjosemorales1986@gmail.com", PASS_APP_GMAIL: "rvhbtmhpjbcccuvm", ACCOUNT_SMPT_SERVICE: "gmail", ACCOUNT_SMPT_HOST: "smtp.gmail.com", ACCOUNT_SMPT_PORT: "587", ACCOUNT_SMPT_SECURE: "false", OS: process.env.OS });
  let usergmail = String(USER_GMAIL);
  let usergmailp = String(PASS_APP_GMAIL);
  let accountsmptservice = String(ACCOUNT_SMPT_SERVICE);
  let accountsmpthost = String(ACCOUNT_SMPT_HOST);
  let accountsmptport = String(ACCOUNT_SMPT_PORT);
  let accountsmptsecure = String(ACCOUNT_SMPT_SECURE);
  const userGenerate = generateId(15);
  try {
    await turdb.execute({
      sql: "INSERT INTO Usermsj (id, userId, nombre, modelo, telefono, email, mensaje, opcionSeleccionada, opcionDispositivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [userGenerate, userGenerate, nombre, modelo, telefono, email, mensaje, opcionSeleccionada, opcionDispositivo]
    });
    //!el env si funciona aqui
    const mailOptions = {
      from: {
        name: `Genius Bar Servicio Tecnico Consulta Cliente: ${nombre}`,
        address: USER_GMAIL
      },
      // sender address
      to: `geniusbarservices.ar@gmail.com, ${email}`,
      // list of receivers
      subject: "Confimacion de envío de la consulta",
      // Subject line
      text: "Hola ${nombre}, hemos recibido tu mensaje",
      // plain text body
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
            `,
      // html body
      attachments: [
        {
          filename: "test.pdf",
          path: "../../ASTRO/service-geniusbar-app/src/Pruebas/test.pdf.pdf",
          contenType: "application/pdf"
        },
        {
          filename: "sample_jpg",
          path: "../../ASTRO/service-geniusbar-app/src/Pruebas/sample_jpg.jpg",
          contenType: "image/jpg"
        }
      ]
    };
    await sendMail(
      mailOptions,
      usergmail,
      usergmailp,
      accountsmptservice,
      accountsmpthost,
      accountsmptport,
      accountsmptsecure
    );
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    return new Response("Error al enviar el formulario", { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { format } from "@formkit/tempo";//dependencia formik instalada

export function formatDate(): string {
    const d = new Date();
    
    return  format({
        date: d,
        format: {date: 'short', time: 'short'},// usa la sintaxys del objeto para la funcion format
        tz: "America/Argentina/Buenos_Aires", // especifica el timezone usando la propiedad tz
        locale: 'es-AR', // setea el locale usando la propiedad locale.
    })
};

export function getCurrentFormattedDate(): string {
    return formatDate();
}
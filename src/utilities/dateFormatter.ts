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


// export function formatDate(date: Date | number): string {
//     const d = new Date(date);
//     return d.toLocaleString('es-AR', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//     });
// };

// export function getCurrentFormattedDate(): string {
//     return formatDate(new Date());
// }
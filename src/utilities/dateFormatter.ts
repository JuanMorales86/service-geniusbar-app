import { format } from "@formkit/tempo";//dependencia formik instalada

/**
 * Formatea una fecha dada (string, número o Date) a un formato legible.
 * @param dateString La fecha a formatear.
 * @returns La fecha formateada como string (ej: "2/10/2024").
 */
export function formatDate(dateString: string | number | Date): string {
    let dateToFormat: Date;

    // Parsea la fecha si es un string en formato DD/MM/YYYY
    if (typeof dateString === 'string' && /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/.test(dateString)) {
        const parts = dateString.split(/[\/\-]/);
        // new Date(year, monthIndex, day)
        dateToFormat = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    } else {
        dateToFormat = new Date(dateString);
    }

    if (isNaN(dateToFormat.getTime())) {
        return "Fecha inválida";
    }

    return format(dateToFormat, "DD/MM/YYYY", 'es-AR');
}

/**
 * Obtiene la fecha y hora actual formateada.
 * @returns La fecha y hora actual como string (ej: "2/10/2024, 15:30").
 */
export function getCurrentFormattedDate(): string {
    return format(new Date(), { date: 'short', time: 'short' }, 'es-AR');
}

/**
 * Obtiene la fecha y hora actual en formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).
 * Este es el formato ideal para guardar en bases de datos.
 */
export function getISODate(): string {
    return new Date().toISOString();
}
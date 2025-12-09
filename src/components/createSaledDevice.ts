import type { APIContext } from "astro";
import { generateId } from "lucia";
import { getCurrentFormattedDate } from "@/utilities/dateFormatter";
import { turdb } from "@../../../db/turso";

export async function POST(context: APIContext): Promise<Response> {
    try {
        const formData = await context.request.json();
        const {
            clientname, clientdni, clientphone, devicename, deliverydate, currency, brand, model, serial, imei1, imei2, condition_details, price, paymentmethod, description
        } = formData;

        const deviceId = generateId(15);

        await turdb.execute({
            sql: `INSERT INTO SaledDevices 
                  (id, clientname, clientdni, clientphone, saledate, devicename, deliverydate, currency, brand, model, serial, imei1, imei2, condition_details, price, paymentmethod, description) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
                deviceId, clientname, clientdni, clientphone, getCurrentFormattedDate(), devicename, deliverydate, currency, brand, model, serial, imei1, imei2, condition_details, price, paymentmethod, description
            ],
        });

        return new Response(JSON.stringify({ success: true, deviceId }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error creating saled device:', error);
        return new Response(JSON.stringify({ success: false, error: 'Error al crear el registro del dispositivo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
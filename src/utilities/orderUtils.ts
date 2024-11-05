import { db, desc, ServiceOrder } from "astro:db";

export async function getNextOrderNumber() {
    const latestOrder = await db.select({ ordernumber: ServiceOrder.ordernumber })
    .from(ServiceOrder)
    .orderBy(desc(ServiceOrder.ordernumber))
    .limit(1);

    if(latestOrder.length === 0) {
        return 'Orden000';
    }

    const lastNumber = parseInt(latestOrder?.[0]?.ordernumber?.slice(5) ?? '000');//chaining and nullish coalescing ??
    const nextNumber = lastNumber + 1;
    return `Orden${nextNumber.toString().padStart(3, '0')}`;
}
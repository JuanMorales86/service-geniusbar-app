//import { db, desc, ServiceOrder } from "astro:db";
import { turdb } from "../../db/turso";

export async function getNextOrderNumber() {
    // const latestOrder = await db.select({ ordernumber: ServiceOrder.ordernumber })
    // .from(ServiceOrder)
    // .orderBy(desc(ServiceOrder.ordernumber))
    // .limit(1);

    const {rows} = await turdb.execute({
        sql: "SELECT ordernumber FROM ServiceOrder ORDER BY ordernumber DESC LIMIT 1",
        args: [],
    })

    if(rows.length === 0) {
        return 'Orden000';
    }

    //const lastNumber = parseInt(latestOrder?.[0]?.ordernumber?.slice(5) ?? '000');//chaining and nullish coalescing ??
    const lastNumber = parseInt(String(rows[0].ordernumber).slice(5) ?? '000');//chaining and nullish coalescing ??
    const nextNumber = lastNumber + 1;
    return `Orden${nextNumber.toString().padStart(3, '0')}`;
}
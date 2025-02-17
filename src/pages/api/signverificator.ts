// import { db, eq, sql, User } from "astro:db";
import { turdb } from "db/turso";
const cl = console.log.bind(console)

const MAX_FAILED_ATTEMPTS = 4;
const LOCK_DURATION = 60000; //30 minutos

interface UserRow {
    id: string;
    username: string;
    totalAttempts: number;
    failedAttempts: number;
    lastFailedAttempt: string;
}

//Funcion verificadora de cuentas bloqueadas
export async function checkAccountLocked(username: string): Promise<{
    isLocked: boolean; 
    remainingTime: number; 
    permanentLock: boolean}
    > {
    //Buscar Usuario en la Base de datos
    //!const user = await db.select().from(User).where(eq(User.username, username)).limit(1);
    const { rows: userRows } = await turdb.execute({
        sql: "SELECT * FROM User WHERE Username = ? LIMIT 1",
        args: [username]
    })

    const user = userRows[0] as unknown as UserRow;
    
    //Si no encuentra el usuario, no esta bloqueado.
    //if (user.length === 0) return { isLocked: false, remainingTime: 0, permanentLock: false }; //original de astrodb
    if(!user) return { isLocked: false, remainingTime: 0, permanentLock: false }; //Nuevo de turso

    // if (user[0].totalAttempts >= 10) { //original de astrodb
    //     return { isLocked: true, remainingTime: Infinity, permanentLock: true };
    // }
    if(user.totalAttempts >= 10){
        return { isLocked: true, remainingTime: Infinity, permanentLock: true };
    } // Nuevo de turso

    //const updateUser = await db.select().from(User).where(eq(User.username, username)).limit(1);
    
    const {rows: updateUserRows } = await turdb.execute({
        sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
        args: [username]
    })

    const updateUser = updateUserRows[0] as unknown as UserRow;

    //Obtener intentos fallidos y la ultima fecha de intento.
    //const failedAttempts = updateUser[0].failedAttempts;// original de astrodb
    //const lastFailedTimestamp  = parseInt(updateUser[0].lastFailedAttempt);// original de astrodb
    const failedAttempts = updateUser.failedAttempts; //nuevo de turso
    const lastFailedTimestamp  = parseInt(updateUser.lastFailedAttempt);//nuevo de turso
    
      // Only increment if not locked
    if (failedAttempts < MAX_FAILED_ATTEMPTS) {
        await incrementFailedAttempts(username);
        return { isLocked: false, remainingTime: 0, permanentLock: false };
    }
    
    // Check lock status
    const currentTime = Date.now();
    let timeSinceLastAttempt = currentTime - lastFailedTimestamp;

    if (timeSinceLastAttempt >= LOCK_DURATION) {
        await resetFailedAttempts(username);
        return { isLocked: false, remainingTime: 0, permanentLock: false };
    }

    return {isLocked: true, remainingTime: LOCK_DURATION - timeSinceLastAttempt, permanentLock: false  };    
}

//Funcion para incrementar los intentos fallidos
export async function incrementFailedAttempts(username: string): Promise<void> {
    //const beforeUpdate =  await db.select().from(User).where(eq(User.username, username)).limit(1);
    const { rows: beforeUpdateRows } = await turdb.execute({
        sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
        args: [username]
    })
    const beforeUpdates = beforeUpdateRows[0] as unknown as UserRow;

    //const currentUser = await db.select().from(User).where(eq(User.username, username)).limit(1);
    const { rows: currentUserRows } = await turdb.execute({
        sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
        args: [username]
    })
    const currentUserRow = currentUserRows[0] as unknown as UserRow;
    const currentTotal = currentUserRow.totalAttempts || 0;
    cl("Antes de Actualizar",beforeUpdates)

//    await db.update(User).set({
//         failedAttempts: sql`${User.failedAttempts} + 1`,
//         totalAttempts: currentTotal + 1,
//         lastFailedAttempt: Date.now().toString(),
//     }).where(eq(User.username, username));

    await turdb.execute({
        sql: "UPDATE User SET failedAttempts = failedAttempts + 1, totalAttempts = ?, lastFailedAttempt = ? WHERE username = ?",
        args: [currentTotal + 1, Date.now().toString(), username]
    })

    //const afterUpdate =  await db.select().from(User).where(eq(User.username, username)).limit(1);

    const { rows: afterUpdateRows } = await turdb.execute({
        sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
        args: [username]
    })
    const afterUpdateRow = afterUpdateRows[0] as unknown as UserRow;
    cl("Despues de Actualizar",afterUpdateRow)
}

//Funcion para reiniciar los intentos fallidos
export async function resetFailedAttempts(username: string): Promise<void> {
    // await db.update(User).set({
    //     failedAttempts: 0, 
    //     lastFailedAttempt: '0',
    // }).where(eq(User.username, username));

    await turdb.execute({
        sql: "UPDATE User SET failedAttempts = 0, lastFailedAttempt = '0' WHERE username = ?",
        args: [username]
    })
}



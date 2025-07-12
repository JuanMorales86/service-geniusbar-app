// import { db, eq, sql, User } from "astro:db";
import { turdb } from "../../../db/turso";
const cl = console.log.bind(console)

const MAX_FAILED_ATTEMPTS = 4;
const LOCK_DURATION = 60000; //30 minutos

interface UserRow {
    id: string;
    username: string;
    totalAttempts: number ;
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
        sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
        args: [username]
    })

    const user = userRows[0] as unknown as UserRow;//esto es para que typescript sepa que es un objeto de tipo UserRow
    
    //Si no encuentra el usuario, no esta bloqueado. (pero se incrementara en signin.ts)
    if(!user) return { isLocked: false, remainingTime: 0, permanentLock: false };
    //if (user.length === 0) return { isLocked: false, remainingTime: 0, permanentLock: false }; //original de astrodb

    // if (user[0].totalAttempts >= 10) { //original de astrodb
    //     return { isLocked: true, remainingTime: Infinity, permanentLock: true };
    // }

    //Verificar el bloqueo permanente
    if(user.totalAttempts >= 8){
        return { isLocked: true, remainingTime: Infinity, permanentLock: true };
    } // Nuevo de turso

    //const updateUser = await db.select().from(User).where(eq(User.username, username)).limit(1);
    
    //aqui se actualiza el usuario (lo use solo para verificar si se actualizaba solo para comprobar)
    // const {rows: updateUserRows } = await turdb.execute({
    //     sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
    //     args: [username]
    // })

    // const updateUser = updateUserRows[0] as unknown as UserRow;

    //Obtener intentos fallidos y la ultima fecha de intento.
    const failedAttempts = user.failedAttempts; //updateUser es un objeto de tipo UserRow donde failedAttempts es un numero aqui busco el valor de failedAttempts y lo almaceno en failedAttempts
    const lastFailedTimestamp  = parseInt(user.lastFailedAttempt);//nuevo de turso
    //const failedAttempts = updateUser[0].failedAttempts;// original de astrodb
    //const lastFailedTimestamp  = parseInt(updateUser[0].lastFailedAttempt);// original de astrodb
    
    // solo incrementar los intentos fallidos si el usuario no ha sido bloqueado permanentemente
    if (failedAttempts < MAX_FAILED_ATTEMPTS) {
        //await incrementFailedAttempts(username);//movido a signin.ts
        return { isLocked: false, remainingTime: 0, permanentLock: false };
    }
    
    // verificar si el bloqueo temporal ha expirado
    const currentTime = Date.now();
    let timeSinceLastAttempt = currentTime - lastFailedTimestamp;

    if (timeSinceLastAttempt >= LOCK_DURATION) {
        await resetFailedAttempts(username);
        return { isLocked: false, remainingTime: 0, permanentLock: false };
    }
    // cuenta bloqueada temporalmente
    return {isLocked: true, remainingTime: LOCK_DURATION - timeSinceLastAttempt, permanentLock: false  };    
}

//Funcion para incrementar los intentos fallidos
export async function incrementFailedAttempts(username: string): Promise<void> {
    //Chekear que exista el usuario antes de incrementar los intentos fallidos
    const { rows: currentUserRows } = await turdb.execute({
        sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
        args: [username]
     });
    
     // If user does not exist, do not proceed with incrementing attempts.
    // The signin.ts already handles user not found before calling this.
     if(currentUserRows.length === 0){
        return;
     }

    const currentUserRow = currentUserRows[0] as unknown as UserRow;
    const currentTotal = currentUserRow.totalAttempts || 0;
  

    await turdb.execute({
        sql: "UPDATE User SET failedAttempts = failedAttempts + 1, totalAttempts = ?, lastFailedAttempt = ? WHERE username = ?",
        args: [currentTotal + 1, Date.now().toString(), username]
    })

}

//Funcion para reiniciar los intentos fallidos
export async function resetFailedAttempts(username: string): Promise<void> {

    await turdb.execute({
        sql: "UPDATE User SET failedAttempts = 0, lastFailedAttempt = '0' WHERE username = ?",
        args: [username]
    })
}



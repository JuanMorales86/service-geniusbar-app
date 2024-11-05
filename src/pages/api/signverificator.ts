import { db, eq, sql, User } from "astro:db";
const cl = console.log.bind(console)
const MAX_FAILED_ATTEMPTS = 4;
const LOCK_DURATION = 60000; //30 minutos

//Funcion verificadora de cuentas bloqueadas
export async function checkAccountLocked(username: string): Promise<{
    isLocked: boolean; 
    remainingTime: number; 
    permanentLock: boolean}
    > {
    //Buscar Usuario en la Base de datos
    const user = await db.select().from(User).where(eq(User.username, username)).limit(1);
    //Si no encuentra el usuario, no esta bloqueado.
    if (user.length === 0) return { isLocked: false, remainingTime: 0, permanentLock: false };
    
    if (user[0].totalAttempts >= 10) {
        return { isLocked: true, remainingTime: Infinity, permanentLock: true };
    }

    const updateUser = await db.select().from(User).where(eq(User.username, username)).limit(1);
    //Obtener intentos fallidos y la ultima fecha de intento.
    const failedAttempts = updateUser[0].failedAttempts;
    const lastFailedTimestamp  = parseInt(updateUser[0].lastFailedAttempt);
    
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
    const beforeUpdate =  await db.select().from(User).where(eq(User.username, username)).limit(1);
    const currentUser = await db.select().from(User).where(eq(User.username, username)).limit(1);
    const currentTotal = currentUser[0].totalAttempts || 0;
    cl("Antes de Actualizar",beforeUpdate)


    await db.update(User).set({
        failedAttempts: sql`${User.failedAttempts} + 1`,
        totalAttempts: currentTotal + 1,
        lastFailedAttempt: Date.now().toString(),
    }).where(eq(User.username, username));

    const afterUpdate =  await db.select().from(User).where(eq(User.username, username)).limit(1);
    cl("Despues de Actualizar",afterUpdate)
}

//Funcion para reiniciar los intentos fallidos
export async function resetFailedAttempts(username: string): Promise<void> {
    await db.update(User).set({
        failedAttempts: 0, 
        lastFailedAttempt: '0',
    }).where(eq(User.username, username));
}



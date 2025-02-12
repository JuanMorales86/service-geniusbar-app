import { d as db, U as User } from './_astro_db_B32vqkck.mjs';
import { eq, sql } from '@astrojs/db/dist/runtime/virtual.js';

const cl = console.log.bind(console);
const MAX_FAILED_ATTEMPTS = 4;
const LOCK_DURATION = 6e4;
async function checkAccountLocked(username) {
  const user = await db.select().from(User).where(eq(User.username, username)).limit(1);
  if (user.length === 0) return { isLocked: false, remainingTime: 0, permanentLock: false };
  if (user[0].totalAttempts >= 10) {
    return { isLocked: true, remainingTime: Infinity, permanentLock: true };
  }
  const updateUser = await db.select().from(User).where(eq(User.username, username)).limit(1);
  const failedAttempts = updateUser[0].failedAttempts;
  const lastFailedTimestamp = parseInt(updateUser[0].lastFailedAttempt);
  if (failedAttempts < MAX_FAILED_ATTEMPTS) {
    await incrementFailedAttempts(username);
    return { isLocked: false, remainingTime: 0, permanentLock: false };
  }
  const currentTime = Date.now();
  let timeSinceLastAttempt = currentTime - lastFailedTimestamp;
  if (timeSinceLastAttempt >= LOCK_DURATION) {
    await resetFailedAttempts(username);
    return { isLocked: false, remainingTime: 0, permanentLock: false };
  }
  return { isLocked: true, remainingTime: LOCK_DURATION - timeSinceLastAttempt, permanentLock: false };
}
async function incrementFailedAttempts(username) {
  const beforeUpdate = await db.select().from(User).where(eq(User.username, username)).limit(1);
  const currentUser = await db.select().from(User).where(eq(User.username, username)).limit(1);
  const currentTotal = currentUser[0].totalAttempts || 0;
  cl("Antes de Actualizar", beforeUpdate);
  await db.update(User).set({
    failedAttempts: sql`${User.failedAttempts} + 1`,
    totalAttempts: currentTotal + 1,
    lastFailedAttempt: Date.now().toString()
  }).where(eq(User.username, username));
  const afterUpdate = await db.select().from(User).where(eq(User.username, username)).limit(1);
  cl("Despues de Actualizar", afterUpdate);
}
async function resetFailedAttempts(username) {
  await db.update(User).set({
    failedAttempts: 0,
    lastFailedAttempt: "0"
  }).where(eq(User.username, username));
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    checkAccountLocked,
    incrementFailedAttempts,
    resetFailedAttempts
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, checkAccountLocked as c, resetFailedAttempts as r };

import { t as turdb } from './turso_CdaR7E3F.mjs';

const cl = console.log.bind(console);
const MAX_FAILED_ATTEMPTS = 4;
const LOCK_DURATION = 6e4;
async function checkAccountLocked(username) {
  //!const user = await db.select().from(User).where(eq(User.username, username)).limit(1);
  const { rows: userRows } = await turdb.execute({
    sql: "SELECT * FROM User WHERE Username = ? LIMIT 1",
    args: [username]
  });
  const user = userRows[0];
  if (!user) return { isLocked: false, remainingTime: 0, permanentLock: false };
  if (user.totalAttempts >= 10) {
    return { isLocked: true, remainingTime: Infinity, permanentLock: true };
  }
  const { rows: updateUserRows } = await turdb.execute({
    sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
    args: [username]
  });
  const updateUser = updateUserRows[0];
  const failedAttempts = updateUser.failedAttempts;
  const lastFailedTimestamp = parseInt(updateUser.lastFailedAttempt);
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
  const { rows: beforeUpdateRows } = await turdb.execute({
    sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
    args: [username]
  });
  const beforeUpdates = beforeUpdateRows[0];
  const { rows: currentUserRows } = await turdb.execute({
    sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
    args: [username]
  });
  const currentUserRow = currentUserRows[0];
  const currentTotal = currentUserRow.totalAttempts || 0;
  cl("Antes de Actualizar", beforeUpdates);
  await turdb.execute({
    sql: "UPDATE User SET failedAttempts = failedAttempts + 1, totalAttempts = ?, lastFailedAttempt = ? WHERE username = ?",
    args: [currentTotal + 1, Date.now().toString(), username]
  });
  const { rows: afterUpdateRows } = await turdb.execute({
    sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
    args: [username]
  });
  const afterUpdateRow = afterUpdateRows[0];
  cl("Despues de Actualizar", afterUpdateRow);
}
async function resetFailedAttempts(username) {
  await turdb.execute({
    sql: "UPDATE User SET failedAttempts = 0, lastFailedAttempt = '0' WHERE username = ?",
    args: [username]
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    checkAccountLocked,
    incrementFailedAttempts,
    resetFailedAttempts
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, checkAccountLocked as c, resetFailedAttempts as r };

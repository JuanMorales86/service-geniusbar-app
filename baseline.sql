-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "github_id" TEXT,
    "failedAttempts" INTEGER NOT NULL DEFAULT 0,
    "lastFailedAttempt" TEXT NOT NULL DEFAULT '0',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "totalAttempts" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "Usermsj" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "modelo" TEXT,
    "opcionSeleccionada" TEXT NOT NULL,
    "opcionDispositivo" TEXT NOT NULL,
    CONSTRAINT "Usermsj_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expiresAt" INTEGER NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ordernumber" TEXT,
    "clientname" TEXT,
    "clientdni" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "deviceType" TEXT,
    "model" TEXT,
    "serial" TEXT,
    "issue" TEXT,
    "phonedetails" TEXT,
    "devicepassword" TEXT,
    "status" TEXT,
    "createdAt" INTEGER,
    "updatedAt" INTEGER,
    "aditionalObservation" TEXT,
    "donerepairments" TEXT,
    "topay" INTEGER,
    "payed" INTEGER
);

-- CreateTable
CREATE TABLE "OrderCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalOrders" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOrder_ordernumber_key" ON "ServiceOrder"("ordernumber");


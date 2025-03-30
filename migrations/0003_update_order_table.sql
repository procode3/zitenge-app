-- CreateTable
DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
DROP TABLE IF EXISTS "Order";
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "deliveryDate" DATETIME NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "notes" TEXT,
    "phoneNumber" TEXT,
    "guestEmail" TEXT,
    "guestName" TEXT,
    "deposit" REAL,
    "userId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "cancelledby" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
DROP TABLE IF EXISTS "OrderItem";
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "shoeRackId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_shoeRackId_fkey" FOREIGN KEY ("shoeRackId") REFERENCES "ShoeRack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
DROP TABLE IF EXISTS "ShoeRack";
CREATE TABLE "ShoeRack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "image" TEXT,
    "orderId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
DROP INDEX IF EXISTS "User_email_key";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateTable

CREATE TABLE "Color" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL
);


-- CreateIndex
CREATE UNIQUE INDEX "Color_hex_key" ON "Color"("hex");

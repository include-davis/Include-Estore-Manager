-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "shipping_address_line_1" TEXT NOT NULL,
    "shipping_address_line_2" TEXT,
    "shipping_city" TEXT NOT NULL,
    "shipping_state" TEXT,
    "shipping_country" TEXT NOT NULL,
    "shipping_zip" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

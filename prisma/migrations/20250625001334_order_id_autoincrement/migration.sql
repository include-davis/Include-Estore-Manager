/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductToOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `order_id` on the `ProductToOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ProductToOrder" DROP CONSTRAINT "ProductToOrder_order_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductToOrder" DROP CONSTRAINT "ProductToOrder_pkey",
DROP COLUMN "order_id",
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD CONSTRAINT "ProductToOrder_pkey" PRIMARY KEY ("product_id", "order_id");

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

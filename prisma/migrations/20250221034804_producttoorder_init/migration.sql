-- CreateTable
CREATE TABLE "ProductToOrder" (
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductToOrder_pkey" PRIMARY KEY ("product_id","order_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_phone_num" TEXT NOT NULL,
    "billing_address_line_1" TEXT NOT NULL,
    "billing_address_line_2" TEXT,
    "billing_city" TEXT NOT NULL,
    "billing_zip" TEXT NOT NULL,
    "billing_country" TEXT NOT NULL,
    "shipping_address_line_1" TEXT NOT NULL,
    "shipping_address_line_2" TEXT,
    "shipping_city" TEXT NOT NULL,
    "shipping_zip" TEXT NOT NULL,
    "shipping_country" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

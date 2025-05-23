-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "available_quantity" INTEGER NOT NULL,
    "cost_of_production" DOUBLE PRECISION NOT NULL,
    "lead_time" INTEGER NOT NULL,
    "reorder_point" INTEGER NOT NULL,
    "reorder_quantity" INTEGER NOT NULL,
    "safety_stock" INTEGER NOT NULL,
    "stock_on_order" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "special_label_needed" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductToOrder" (
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductToOrder_pkey" PRIMARY KEY ("product_id","order_id")
);

-- CreateTable
CREATE TABLE "ProductToTag" (
    "product_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "ProductToTag_pkey" PRIMARY KEY ("product_id","tag_id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "shipping_address_line_1" TEXT NOT NULL,
    "shipping_address_line_2" TEXT,
    "shipping_city" TEXT NOT NULL,
    "shipping_state" TEXT NOT NULL,
    "shipping_country" TEXT NOT NULL,
    "shipping_zip" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToTag" ADD CONSTRAINT "ProductToTag_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToTag" ADD CONSTRAINT "ProductToTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

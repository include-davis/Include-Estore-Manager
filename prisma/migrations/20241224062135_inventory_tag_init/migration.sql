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

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToTag" ADD CONSTRAINT "ProductToTag_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToTag" ADD CONSTRAINT "ProductToTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

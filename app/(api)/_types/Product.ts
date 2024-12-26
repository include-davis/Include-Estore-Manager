import { Inventory, InventoryInput } from './Inventory';
import { Tag } from './Tag';

export type Product = {
  id: string;
  inventory: Inventory;
  tags: Tag[];
  name: string;
  price: number;
  description: string;
  details: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  special_label_needed: boolean;
};

export type ProductInput = {
  name: string;
  price: number;
  description: string;
  details: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  special_label_needed: boolean;
};

export type ProductInventoryInput = {
  productInput: ProductInput;
  inventoryInput: InventoryInput;
};

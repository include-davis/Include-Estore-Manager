import { Product } from './Product';

export type Inventory = {
  id: string;
  product: Product;
  available_quantity: number;
  cost_of_production: number;
  lead_time: number;
  reorder_point: number;
  reorder_quantity: number;
  safety_stock: number;
  stock_on_order: number;
};

export type InventoryInput = {
  available_quantity: number;
  cost_of_production: number;
  lead_time: number;
  reorder_point: number;
  reorder_quantity: number;
  safety_stock: number;
  stock_on_order: number;
};

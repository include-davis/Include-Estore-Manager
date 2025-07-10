import { Product } from './Product';

export enum OrderStatus {
  PENDING = 'PENDING',
  ORDERED = 'ORDERED',
  SHIPPED = 'SHIPPED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export type Order = {
  id: number;
  total: number;
  customer_name: string;
  customer_email: string;
  customer_phone_num: string;
  billing_address_line_1: string;
  billing_address_line_2: string | undefined;
  billing_city: string;
  billing_zip: string;
  billing_country: string;
  shipping_address_line_1: string;
  shipping_address_line_2: string | undefined;
  shipping_city: string;
  shipping_zip: string;
  shipping_country: string;
  status: OrderStatus;
  created_at: string;
  products: ProductToOrder[];
};

export type ProductToOrder = {
  product_id: string;
  product: Product;
  order_id: number;
  order: Order;
  quantity: number;
};

export type OrderProduct = {
  product: Product;
  quantity: number;
};

export type OrderProductInput = {
  product_id: string;
  quantity: number;
};

export type OrderInput = {
  customer_name: string;
  customer_email: string;
  customer_phone_num: string;
  billing_address_line_1: string;
  billing_address_line_2?: string;
  billing_city: string;
  billing_zip: string;
  billing_country: string;
  shipping_address_line_1: string;
  shipping_address_line_2?: string;
  shipping_city: string;
  shipping_zip: string;
  shipping_country: string;
  status?: OrderStatus;
};

//make all inputs optional
export type OrderUpdateInput = Partial<OrderInput>;

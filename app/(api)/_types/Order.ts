import { Product } from './Product';

export type Order = {
  id: string;
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
  status: string;
  created_at: Date;
  products: ProductToOrder[];
};

export type ProductToOrder = {
  product_id: string;
  product: Product;
  order_id: string;
  order: Order;
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
  status: string;
  created;
};

//make all inputs optional
export type OrderUpdateInput = Partial<OrderInput>;

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  shipping_address_line_1: string;
  shipping_address_line_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_zip: number;
};

export type UserInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  shipping_address_line_1: string;
  shipping_address_line_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_zip: number;
};

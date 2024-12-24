export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  shipping_address_line_1: string;
  shipping_address_line_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_zip: number;
};

export type UserInput = {
  name: string;
  email: string;
  password: string;
  shipping_address_line_1: string;
  shipping_address_line_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_zip: number;
};

import { Product } from './Product';

export type Tag = {
  id: string;
  name: string;
  products: Product[];
};

export type TagInput = {
  name: string;
};

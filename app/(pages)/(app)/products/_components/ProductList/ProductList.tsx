import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

interface ProductInfo {
  imageUrl: string;
  title: string;
  listed: boolean;
}

interface ProductListProps {
  products: ProductInfo[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map((product, index) => (
        <ProductCard key={index} productInfo={product} />
      ))}
    </div>
  );
};

export default ProductList;

import styles from './page.module.scss';
import ProductList from './_components/ProductList/ProductList';
import SearchFilters from './_components/SearchFilters/SearchFilters';

const products = [
  {
    imageUrl:
      'https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg',
    title: 'Apple Watch Series 9',
    listed: true,
  },
  {
    imageUrl:
      'https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg',
    title: 'Apple Watch Series 9',
    listed: false,
  },
  {
    imageUrl:
      'https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg',
    title: 'Apple Watch Series 9',
    listed: false,
  },
  {
    imageUrl:
      'https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg',
    title: 'Apple Watch Series 9',
    listed: false,
  },
  {
    imageUrl:
      'https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg',
    title: 'Apple Watch Series 9',
    listed: true,
  },
  {
    imageUrl:
      'https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg',
    title: 'Apple Watch Series 9',
    listed: false,
  },
  {
    imageUrl:
      'https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg',
    title: 'Apple Watch Series 9',
    listed: false,
  },
  {
    imageUrl:
      'https://m.media-amazon.com/images/I/61nxFEV-alL._AC_UF894,1000_QL80_.jpg',
    title: 'Apple Watch Series 9',
    listed: true,
  },
];

export default function Products() {
  return (
    <div className={styles.generalcontainer}>
      <h2>Products</h2>
      <div className={`${styles.generalcontainer} ${styles.main}`}>
        <SearchFilters />
        <ProductList products={products} />
      </div>
    </div>
  );
}

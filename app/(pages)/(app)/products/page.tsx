'use client';
import styles from './page.module.scss';
import ProductList from './_components/ProductList/ProductList';

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
      <div className={styles.topbar}>
        <h2>Product Listings</h2>
        <div className={styles.addbutton}>+ Add</div>
      </div>
      <div className={styles.rowbaropposite}>
        <input
          className={styles.searchbar}
          type="text"
          id="searchbar"
          name="searchbar"
          placeholder="Search Listings"
        ></input>
        <div className={styles.pagenav}>
          <div className={styles.circlebutton}>&lt;</div>0 out of 0
          <div className={styles.circlebutton}>&gt;</div>
        </div>
      </div>
      <div className={styles.rowbar}>
        <div className={styles.genbutton}>All</div>
        <div className={styles.genbutton}>Active</div>
        <div className={styles.genbutton}>Draft</div>
        <div className={styles.genbutton}>Archived</div>
      </div>
      <div className={styles.listingarea}>
        {products.length == 0 ? (
          <div className={styles.centerbar}>
            <div className={styles.addlistingbutton}>List A Product</div>
          </div>
        ) : (
          <div>
            <ProductList products={products} />
          </div>
        )}
      </div>
    </div>
  );
}

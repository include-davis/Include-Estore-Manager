import ProductMedia from './_components/ProductMedia';
import styles from './page.module.scss';

export default function ProductPage() {
  return (
    <div className={styles.container}>
      <ProductMedia />
    </div>
  );
}

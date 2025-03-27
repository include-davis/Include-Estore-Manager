import Image from 'next/image';

import styles from './OrderDescription.module.scss';

export default function OrderDescription() {
  return (
    <div className={styles.order_desc}>
      <ProductImage />
      <ProductDescription />
    </div>
  );
}

function ProductImage() {
  return (
    <div className={styles.img_container}>
      <Image
        src="/orders/example_item.png"
        alt="image of ordered product"
        width={0}
        height={0}
        sizes="100vw"
        className={styles.img}
      />
    </div>
  );
}

function ProductDescription() {
  return (
    <div className={styles.product_desc}>
      <h3 className={styles.name}>Mens Puffer Jacket</h3>
      <div className={styles.qualities}>
        <DataField label="Quantity" value="1" />
        <DataField label="Color" value="Gray" />
      </div>
      <div className={styles.dates}>
        <DataField label="Order Date" value="3/2/2024" />
        <DataField label="Ship Date" value="3/2/2024" />
        <DataField label="Arrival Date" value="3/2/2024" />
      </div>
    </div>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

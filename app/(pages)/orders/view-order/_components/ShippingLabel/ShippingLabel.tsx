'use client';

import Image from 'next/image';
import { useState } from 'react';

import labelIcon from '/public/icons/label.svg';

import styles from './ShippingLabel.module.scss';

export default function ShippingLabel() {
  const [showLabel, setShowLabel] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <Image src={labelIcon} alt="label icon" />
          Shipping Label
        </div>
        <button onClick={() => setShowLabel(!showLabel)}>
          {showLabel ? 'See Less' : 'See More'}
        </button>
      </div>
      {showLabel && (
        <div className={styles.img_container}>
          <Image
            src="/orders/example_label.png"
            alt="example shipping label"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.img}
          />
        </div>
      )}
    </div>
  );
}

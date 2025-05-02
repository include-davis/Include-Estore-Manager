'use client';
import Image from 'next/image';
import styles from './OrderPart.module.scss';
import material from './material.jpg'
export default function OrderPart() {
    return (
      <div className={styles.container}>
        <div className={styles.material}>
            <Image src={material} alt="material image" className={styles.image} />
            <div className={styles.materialtext}>
                <p className={styles.text}>Material Name</p>
                <p className={styles.text}>Category</p>
            </div>
        </div>
        <div className={styles.priceBreakdown}>
            <div className={styles.number}>
                <p className={styles.text}>1</p>
            </div>
            <div className={styles.times}>
                <p className={styles.text}>X</p>
            </div>
            <div className={styles.pricetimes}>
                <p className={styles.text}>$15.00</p>
            </div>
        </div>
        <div className={styles.price}>
            <p className={styles.text}>$15.00</p>
        </div>
      </div>
    );
  }
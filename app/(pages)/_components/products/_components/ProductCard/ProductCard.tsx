import React from 'react';
import styles from './ProductCard.module.scss';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaRegTrashAlt,
  FaPencilAlt,
} from 'react-icons/fa';

// Still unsure about this part since the figma online doesn't have a listed boolean, so for now, just a placeholder
interface ProductInfo {
  imageUrl: string;
  title: string;
  listed: boolean;
}

interface ProductCardProps {
  productInfo: ProductInfo;
}

const ProductCard: React.FC<ProductCardProps> = ({ productInfo }) => {
  return (
    <div className={styles.productCard}>
      <img
        src={productInfo.imageUrl}
        alt={productInfo.title}
        className={styles.productImage}
      />
      <div className={styles.horizontalLine}></div>
      <div className={styles.productInfo}>
        <h4 className={styles.productTitle}>{productInfo.title}</h4>
        <div className={styles.statusContainer}>
          {productInfo.listed ? (
            <span className={styles.listedStatus}>
              <FaCheckCircle /> <p>Listed</p>
            </span>
          ) : (
            <span className={styles.notListedStatus}>
              <FaTimesCircle /> <p>Not Listed</p>
            </span>
          )}
        </div>
      </div>
      <div className={styles.trashEditButtonContainer}>
        <button className={styles.productButton}>
          {<FaPencilAlt className={styles.trashEditButton} />}
        </button>
        <button className={styles.productButton}>
          {<FaRegTrashAlt className={styles.trashEditButton} />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

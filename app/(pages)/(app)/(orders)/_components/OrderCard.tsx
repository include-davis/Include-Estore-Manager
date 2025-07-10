'use client';

import Image from 'next/image';
import styles from './OrderCard.module.scss';
import { OrderStatus } from '@datatypes/Order';

interface OrderCardProps {
  id: number;
  created_at: string;
  status: OrderStatus;
  image: string;
}

export default function OrderCard({
  id,
  created_at,
  status,
  image,
}: OrderCardProps) {
  const statusLabels = {
    [OrderStatus.ORDERED]: 'Ordered',
    [OrderStatus.SHIPPED]: 'Shipped',
    [OrderStatus.IN_TRANSIT]: 'In Transit',
    [OrderStatus.DELIVERED]: 'Delivered',
    [OrderStatus.PENDING]: 'Pending',
    [OrderStatus.CANCELLED]: 'Cancelled',
    [OrderStatus.REFUNDED]: 'Refunded',
  };

  const statusValues = Object.values(OrderStatus);
  const currentStatusIndex = statusValues.indexOf(status);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.product_image}>
          <Image src={image} alt="Product" fill className={styles.image} />
        </div>

        <div className={styles.order_info}>
          <div className={styles.order_details}>
            <h3 className={styles.order_id}>Order #{id}</h3>
            <p className={styles.order_date}>
              Order Placed:{' '}
              {new Date(Number(created_at)).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className={styles.progress_section}>
            <div className={styles.progress_bar}>
              {statusValues.map((value, index) => (
                <div key={index} className={styles.status_item}>
                  <div
                    className={`${styles.status_dot} ${
                      index <= currentStatusIndex
                        ? styles.completed
                        : styles.pending
                    } ${index === currentStatusIndex ? styles.current : ''}`}
                  />
                  <span className={styles.status_label}>
                    {statusLabels[value]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className={styles.view_order_btn}>View Order</button>
    </div>
  );
}

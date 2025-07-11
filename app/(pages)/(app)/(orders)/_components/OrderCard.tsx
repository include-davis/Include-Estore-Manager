'use client';

import Image from 'next/image';
import styles from './OrderCard.module.scss';
import { CancellationStatus, OrderStatus } from '@datatypes/Order';

interface OrderCardProps {
  id: number;
  created_at: string;
  status: OrderStatus;
  cancellation_status: CancellationStatus | null;
  image: string;
}

export default function OrderCard({
  id,
  created_at,
  status,
  cancellation_status,
  image,
}: OrderCardProps) {
  const progressBarStatuses = [
    OrderStatus.PENDING,
    OrderStatus.ORDERED,
    OrderStatus.SHIPPED,
    OrderStatus.IN_TRANSIT,
    OrderStatus.DELIVERED,
  ];

  const progressBarLabels: { [key: string]: string } = {
    [OrderStatus.PENDING]: 'Pending',
    [OrderStatus.ORDERED]: 'Ordered',
    [OrderStatus.SHIPPED]: 'Shipped',
    [OrderStatus.IN_TRANSIT]: 'In Transit',
    [OrderStatus.DELIVERED]: 'Delivered',
  };

  const badgeStatusLabels: { [key: string]: string } = {
    [CancellationStatus.CANCELLED]: 'Cancelled',
    [CancellationStatus.REFUNDED]: 'Refunded',
  };

  const currentStatusIndex = progressBarStatuses.indexOf(status);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.product_image}>
          <Image src={image} alt="Product" fill className={styles.image} />
        </div>

        <div className={styles.order_info}>
          <div className={styles.order_details}>
            <div className={styles.order_id_container}>
              <h3 className={styles.order_id}>Order #{id}</h3>
              {cancellation_status && (
                <span
                  className={`${styles.status_badge} ${
                    styles[cancellation_status.toLowerCase()]
                  }`}
                >
                  {badgeStatusLabels[cancellation_status]}
                </span>
              )}
            </div>
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
              {progressBarStatuses.map((value, index) => (
                <div key={index} className={styles.status_item}>
                  <div
                    className={`${styles.status_dot} ${
                      index <= currentStatusIndex
                        ? styles.completed
                        : styles.pending
                    } ${index === currentStatusIndex ? styles.current : ''}`}
                  />
                  <span className={styles.status_label}>
                    {progressBarLabels[value]}
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

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Order } from '@datatypes/Order';
import OrderCard from '../OrderCard';
import styles from './OrderSection.module.scss';

interface OrderSectionProps<T extends string> {
  title: string;
  orders: Order[];
  statusOptions: (T | 'All')[];
  statusClassMap: { [key: string]: string };
  selectedStatus: T | 'All';
  onStatusChange: (status: T | 'All') => void;
  page: number;
  onPageChange: (page: number) => void;
  highestPage: number;
}

export default function OrderSection<T extends string>({
  title,
  orders,
  statusOptions,
  statusClassMap,
  selectedStatus,
  onStatusChange,
  page,
  onPageChange,
  highestPage,
}: OrderSectionProps<T>) {
  return (
    <div className={styles.container}>
      <div className={styles.section_header}>
        <h2>{title}</h2>
        <div className={styles.pagination}>
          <button
            className={styles.pagination_btn}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <FaChevronLeft />
          </button>
          <span className={styles.pagination_text}>
            {page + 1} of {highestPage + 1}
          </span>
          <button
            className={styles.pagination_btn}
            onClick={() => onPageChange(page + 1)}
            disabled={page === highestPage}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.status_filters}>
        {statusOptions.map((status) => (
          <button
            key={status}
            type="button"
            className={`${styles.filter_btn} ${
              styles[statusClassMap[status]]
            } ${selectedStatus === status ? styles.selected : ''}`}
            onClick={() => onStatusChange(status)}
          >
            {status === 'All'
              ? 'All'
              : status
                  .replace(/_/g, ' ')
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
          </button>
        ))}
      </div>

      <div className={styles.order_cards}>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            id={order.id}
            created_at={order.created_at}
            status={order.status}
            cancellation_status={order.cancellation_status}
            image={''}
          />
        ))}
      </div>
    </div>
  );
}

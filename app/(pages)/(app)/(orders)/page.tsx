'use client';

import { useState, useEffect } from 'react';
import { gql } from 'graphql-tag';
import OrderCard from './_components/OrderCard';
import sendApolloRequest from '../../_utils/sendApolloRequest';
import { Order } from '@datatypes/Order';
import styles from './page.module.scss';

const query = gql`
  query OrderQuery($offset: Int!, $limit: Int!) {
    orders(offset: $offset, limit: $limit) {
      id
      customer_name
      customer_email
      customer_phone_num
      created_at
      status
      total
      shipping_address_line_1
      shipping_address_line_2
      shipping_city
      shipping_country
      shipping_zip
      billing_address_line_1
      billing_address_line_2
      billing_city
      billing_country
      billing_zip
      products {
        product {
          id
          name
          price
          discount
        }
        quantity
      }
    }
  }
`;

// Example IDs
const variables = {
  offset: 0,
  limit: 5,
};

export default function ViewOrderCards() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statusClassMap: { [key: string]: string } = {
    All: 'all-btn',
    Ordered: 'ordered',
    Packed: 'packed',
    Shipped: 'shipped',
    'In Transit': 'transit',
  };

  const statusOptions = ['All', 'Ordered', 'Packed', 'Shipped', 'In Transit'];

  // Updated order data to better match the design
  // const orderData = [
  //   {
  //     orderId: '#48219',
  //     shippingInfo: 'Pack by April 30',
  //     orderDate: 'April 26, 2025',
  //     status: 1, // Packed
  //     image: '/sample-product/puffer.png',
  //   },
  //   {
  //     orderId: '#73056',
  //     shippingInfo: 'Ship by April 30',
  //     orderDate: 'April 22, 2025',
  //     status: 2, // Shipped
  //     image: '/sample-product/watch.png',
  //   },
  //   {
  //     orderId: '#19547',
  //     shippingInfo: 'Ship by April 30',
  //     orderDate: 'April 18, 2025',
  //     status: 3, // In Transit
  //     image: '/sample-product/sneaker.png',
  //   },
  // ];

  // const pastOrders = [
  //   {
  //     orderId: '#15432',
  //     shippingInfo: 'Delivered',
  //     orderDate: 'April 15, 2025',
  //     status: 4, // Delivered
  //     image: '/sample-product/cap.png',
  //   },
  //   {
  //     orderId: '#12853',
  //     shippingInfo: 'Delivered',
  //     orderDate: 'April 12, 2025',
  //     status: 4, // Delivered
  //     image: '/sample-product/bear.png',
  //   },
  // ];

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await sendApolloRequest({ request: query, variables });
      setOrders(orderData.data.orders);
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.page_container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Orders</h1>

        <div className={styles.searchbar}>
          <input
            className={styles.search}
            type="text"
            placeholder="Search orders"
            name="search"
          />
          <button className={styles.search_submit} type="submit">
            Search
          </button>
        </div>
      </div>

      <div className={styles.progress_section}>
        <div className={styles.section_header}>
          <h2>In Progress</h2>
          <div className={styles.pagination}>
            <button className={styles.pagination_btn}>&#60;</button>
            <span className={styles.pagination_text}>1 of 5</span>
            <button className={styles.pagination_btn}>&#61;</button>
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
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className={styles.order_cards}>
          {orders.map((order, index) => (
            <OrderCard
              key={index}
              id={order.id}
              created_at={order.created_at}
              status={order.status}
              image={''}
              // image={order.image}
            />
          ))}
        </div>
      </div>

      {/* <div className={styles.past_orders_section}>
        <h2>Past Orders</h2>
        <div className={styles.order_cards}>
          {pastOrders.map((order, index) => (
            <OrderCard
              key={index}
              orderId={order.orderId}
              orderDate={order.orderDate}
              status={order.status}
              image={order.image}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}

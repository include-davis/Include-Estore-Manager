'use client';

import { useState, useEffect } from 'react';
import { gql } from 'graphql-tag';
import sendApolloRequest from '../../_utils/sendApolloRequest';
import { Order, OrderStatus, CancellationStatus } from '@datatypes/Order';
import styles from './page.module.scss';
import OrderSection from './_components/OrderSection/OrderSection';

const query = gql`
  query OrderQuery(
    $offset: Int!
    $limit: Int!
    $statuses: [OrderStatus!]
    $cancellation_statuses: [CancellationStatus!]
  ) {
    orders(
      offset: $offset
      limit: $limit
      statuses: $statuses
      cancellation_statuses: $cancellation_statuses
    ) {
      id
      customer_name
      customer_email
      customer_phone_num
      created_at
      status
      cancellation_status
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

const variables = {
  offset: 0,
  limit: 5,
};

export default function ViewOrderCards() {
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'All'>(
    'All'
  );
  const [selectedCompletedStatus, setSelectedCompletedStatus] = useState<
    CancellationStatus | 'All' | 'DELIVERED'
  >('All');

  const statusClassMap: { [key: string]: string } = {
    All: 'all-btn',
    [OrderStatus.PENDING]: 'pending',
    [OrderStatus.ORDERED]: 'ordered',
    [OrderStatus.SHIPPED]: 'shipped',
    [OrderStatus.IN_TRANSIT]: 'transit',
  };

  const completedStatusClassMap: { [key: string]: string } = {
    All: 'all-btn',
    DELIVERED: 'delivered',
    [CancellationStatus.CANCELLED]: 'cancelled',
    [CancellationStatus.REFUNDED]: 'refunded',
  };

  const statusOptions: (OrderStatus | 'All')[] = [
    'All',
    OrderStatus.PENDING,
    OrderStatus.ORDERED,
    OrderStatus.SHIPPED,
    OrderStatus.IN_TRANSIT,
  ];

  const completedStatusOptions: (CancellationStatus | 'All' | 'DELIVERED')[] = [
    'All',
    'DELIVERED',
    ...Object.values(CancellationStatus),
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      const inProgressStatuses =
        selectedStatus === 'All'
          ? [
              OrderStatus.PENDING,
              OrderStatus.ORDERED,
              OrderStatus.SHIPPED,
              OrderStatus.IN_TRANSIT,
            ]
          : [selectedStatus];
      const inProgressPromise = sendApolloRequest({
        request: query,
        variables: {
          ...variables,
          statuses: inProgressStatuses,
        },
      });

      let completed_statuses: OrderStatus[] = [];
      let cancellation_statuses: CancellationStatus[] = [];

      if (selectedCompletedStatus === 'All') {
        completed_statuses = [OrderStatus.DELIVERED];
        cancellation_statuses = Object.values(CancellationStatus);
      } else if (selectedCompletedStatus === 'DELIVERED') {
        completed_statuses = [OrderStatus.DELIVERED];
      } else {
        cancellation_statuses = [selectedCompletedStatus as CancellationStatus];
      }

      const completedPromise = sendApolloRequest({
        request: query,
        variables: {
          ...variables,
          statuses:
            completed_statuses.length > 0 ? completed_statuses : undefined,
          cancellation_statuses:
            cancellation_statuses.length > 0
              ? cancellation_statuses
              : undefined,
        },
      });

      const [inProgressData, completedData] = await Promise.all([
        inProgressPromise,
        completedPromise,
      ]);

      setInProgressOrders(inProgressData.data.orders);
      setCompletedOrders(completedData.data.orders);
    };

    fetchOrders();
  }, [selectedStatus, selectedCompletedStatus]);

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

      <OrderSection
        title="In Progress"
        orders={inProgressOrders}
        statusOptions={statusOptions}
        statusClassMap={statusClassMap}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <OrderSection
        title="Completed"
        orders={completedOrders}
        statusOptions={completedStatusOptions}
        statusClassMap={completedStatusClassMap}
        selectedStatus={selectedCompletedStatus}
        onStatusChange={setSelectedCompletedStatus}
      />
    </div>
  );
}

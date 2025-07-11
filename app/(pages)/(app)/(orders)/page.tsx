'use client';

import { useState, useEffect } from 'react';
import { gql } from 'graphql-tag';
import sendApolloRequest from '../../_utils/sendApolloRequest';
import { Order, OrderStatus, CancellationStatus } from '@datatypes/Order';
import OrderSection from './_components/OrderSection/OrderSection';
import styles from './page.module.scss';

const QUERY_LIMIT = 3;

const ordersQuery = gql`
  query OrderQuery(
    $offset: Int!
    $limit: Int!
    $statuses: [OrderStatus!]
    $cancellation_statuses: [CancellationStatus!]
    $search: String
  ) {
    orders(
      offset: $offset
      limit: $limit
      statuses: $statuses
      cancellation_statuses: $cancellation_statuses
      search: $search
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

const countQuery = gql`
  query OrdersCount(
    $statuses: [OrderStatus!]
    $cancellation_statuses: [CancellationStatus!]
    $search: String
  ) {
    ordersCount(
      statuses: $statuses
      cancellation_statuses: $cancellation_statuses
      search: $search
    )
  }
`;

export default function ViewOrderCards() {
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
  const [inProgressOrdersCount, setInProgressOrdersCount] = useState(0);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'All'>(
    'All'
  );
  const [selectedCompletedStatus, setSelectedCompletedStatus] = useState<
    CancellationStatus | 'All' | 'DELIVERED'
  >('All');
  const [inProgressPage, setInProgressPage] = useState(0);
  const [completedPage, setCompletedPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setInProgressPage(0);
    setCompletedPage(0);
  };

  useEffect(() => {
    const fetchInProgressOrders = async () => {
      const inProgressStatuses =
        selectedStatus === 'All'
          ? [
              OrderStatus.PENDING,
              OrderStatus.ORDERED,
              OrderStatus.SHIPPED,
              OrderStatus.IN_TRANSIT,
            ]
          : [selectedStatus];
      const ordersPromise = sendApolloRequest({
        request: ordersQuery,
        variables: {
          offset: inProgressPage * QUERY_LIMIT,
          limit: QUERY_LIMIT,
          statuses: inProgressStatuses,
          search: searchTerm,
        },
      });
      const countPromise = sendApolloRequest({
        request: countQuery,
        variables: {
          statuses: inProgressStatuses,
          search: searchTerm,
        },
      });
      const [ordersData, countData] = await Promise.all([
        ordersPromise,
        countPromise,
      ]);
      setInProgressOrders(ordersData.data.orders);
      setInProgressOrdersCount(countData.data.ordersCount);
    };
    fetchInProgressOrders();
  }, [selectedStatus, inProgressPage, searchTerm]);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
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

      const ordersPromise = sendApolloRequest({
        request: ordersQuery,
        variables: {
          offset: completedPage * QUERY_LIMIT,
          limit: QUERY_LIMIT,
          statuses:
            completed_statuses.length > 0 ? completed_statuses : undefined,
          cancellation_statuses:
            cancellation_statuses.length > 0
              ? cancellation_statuses
              : undefined,
          search: searchTerm,
        },
      });
      const countPromise = sendApolloRequest({
        request: countQuery,
        variables: {
          statuses:
            completed_statuses.length > 0 ? completed_statuses : undefined,
          cancellation_statuses:
            cancellation_statuses.length > 0
              ? cancellation_statuses
              : undefined,
          search: searchTerm,
        },
      });
      const [ordersData, countData] = await Promise.all([
        ordersPromise,
        countPromise,
      ]);
      setCompletedOrders(ordersData.data.orders);
      setCompletedOrdersCount(countData.data.ordersCount);
    };
    fetchCompletedOrders();
  }, [selectedCompletedStatus, completedPage, searchTerm]);

  const highestInProgressPage = Math.max(
    0,
    Math.ceil(inProgressOrdersCount / QUERY_LIMIT) - 1
  );
  const highestCompletedPage = Math.max(
    0,
    Math.ceil(completedOrdersCount / QUERY_LIMIT) - 1
  );

  return (
    <div className={styles.page_container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Orders</h1>

        <form className={styles.searchbar} onSubmit={handleSearch}>
          <input
            className={styles.search}
            type="text"
            placeholder="Search orders"
            name="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className={styles.search_submit} type="submit">
            Search
          </button>
        </form>
      </div>

      <OrderSection
        title="In Progress"
        orders={inProgressOrders}
        statusOptions={statusOptions}
        statusClassMap={statusClassMap}
        selectedStatus={selectedStatus}
        onStatusChange={(status) => {
          setSelectedStatus(status);
          setInProgressPage(0);
        }}
        page={inProgressPage}
        onPageChange={setInProgressPage}
        highestPage={highestInProgressPage}
      />

      <OrderSection
        title="Completed"
        orders={completedOrders}
        statusOptions={completedStatusOptions}
        statusClassMap={completedStatusClassMap}
        selectedStatus={selectedCompletedStatus}
        onStatusChange={(status) => {
          setSelectedCompletedStatus(status);
          setCompletedPage(0);
        }}
        page={completedPage}
        onPageChange={setCompletedPage}
        highestPage={highestCompletedPage}
      />
    </div>
  );
}

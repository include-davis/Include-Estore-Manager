'use client';
import React, { useState } from 'react';
import OrderCard from './_components/OrderCard';
import styles from './page.module.scss';

export default function ViewOrderCards() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  const statusClassMap = {
    All: 'all-btn',
    Ordered: 'ordered',
    Packed: 'packed',
    Shipped: 'shipped',
    'In Transit': 'transit',
  };

  const dateTime = new Date('2024-03-01T10:36:01.516Z');
  const progressList = [
    {
      name: 'Lightweight Water-Resistant Hooded Puffer Coat',
      date: dateTime,
      status: 3,
      image: '/sample-product/puffer.png',
      icon: 0,
    },
    {
      name: 'Lightweight Water-Resistant Hooded Puffer Coat',
      date: dateTime,
      status: 1,
      image: '/sample-product/watch.png',
      icon: 2,
    },
    {
      name: 'Lightweight Water-Resistant Hooded Puffer Coat',
      date: dateTime,
      status: 1,
      image: '/sample-product/sneaker.png',
      icon: 1,
    },
    {
      name: 'Lightweight Water-Resistant Hooded Puffer Coat',
      date: dateTime,
      status: 1,
      image: '/sample-product/plant.png',
      icon: 0,
    },
  ];
  const deliveredList = [
    {
      name: 'Lightweight Water-Resistant Hooded Puffer Coat',
      date: dateTime,
      status: 4,
      image: '/sample-product/cap.png',
      icon: 3,
    },
    {
      name: 'Lightweight Water-Resistant Hooded Puffer Coat',
      date: dateTime,
      status: 4,
      image: '/sample-product/bear.png',
      icon: 3,
    },
    {
      name: 'Lightweight Water-Resistant Hooded Puffer Coat',
      date: dateTime,
      status: 4,
      image: '/sample-product/hydro.png',
      icon: 3,
    },
  ];
  return (
    
    <div className={styles.page_container}>
      <div className={styles.orders}>
        <h4 className={styles.text}>Orders</h4>
        
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
      <div className={styles.progress}>
        <h4>In Progress</h4>
        <div className={styles.status}>
          {['All', 'Ordered', 'Packed', 'Shipped', 'In Transit'].map((status) => (
          <button
            key={status}
            type="button"
            className={`
              ${styles.all} 
              ${styles[statusClassMap[status]]} 
              ${selectedStatus === status ? styles.clicked : ''}
            `}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </button>
        ))}
        </div>
        <div className={styles.order_cards}>
          {progressList.map((item, index) => (
            <div key={index}>
              <OrderCard
                title={item.name}
                date={item.date}
                status={item.status}
                image={item.image}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.past_orders}>
        <h4>Past Orders</h4>
        <div className={styles.order_cards}>
          {deliveredList.map((item, index) => (
            <div key={index}>
              <OrderCard
                title={item.name}
                date={item.date}
                status={item.status}
                image={item.image}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

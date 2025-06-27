'use client';
import styles from './CreateProductForm.module.scss';
import React, { useState } from 'react';
import { FormEvent } from 'react';
import AboutPage from './AboutPage';
import DetailsPage from './DetailsPage';
import ShippingPage from './ShippingPage';
import CarriersPage from './CarriersPage';

const ItemsBar = ({
  items,
  activeIndex,
  onTabChange,
}: {
  items: string[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}) => {
  return (
    <nav className={styles.navbar}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.navItem} ${
            activeIndex === index ? styles.active : ''
          }`}
          onClick={() => onTabChange(index)}
        >
          {item}
        </div>
      ))}
      <div
        className={styles.activeIndicator}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
    </nav>
  );
};

export default function CreateProductForm() {
  const [activeTab, setActiveTab] = useState(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <AboutPage />;
      case 1:
        return <DetailsPage />;
      case 2:
        return <ShippingPage />;
      case 3:
        return <CarriersPage />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>Create Product</h3>
        </div>
        <div className={styles.button_container}>
          <button className={styles.delete_button}>Delete</button>
        </div>
      </div>
      <div className={styles.listing}>
        <ItemsBar
          items={['About', 'Details', 'Shipping', 'Carriers']}
          activeIndex={activeTab}
          onTabChange={setActiveTab}
        />
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>{renderContent()}</div>
          <div className={styles.button_container}>
            <input
              className={styles.white_button}
              type="reset"
              value="Cancel"
            />
            <input
              className={styles.purple_button}
              type="submit"
              value="Save & Next"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

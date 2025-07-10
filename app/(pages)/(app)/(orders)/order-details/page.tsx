'use client';
import OrderPart from './_components/OrderPart';
import React, { useState } from 'react';
import styles from './page.module.scss';

export default function OrderDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className={styles.container}>
      <div className={styles.seccontainer}>
        <div className={styles.back}>
          <div className={styles.arrowcontainer}>
            <button className={styles.arrow}></button>
          </div>
        </div>
        <div className={styles.maincontainer}>
          <div className={styles.orderdelete}>
            <h1 className={styles.h1text}>Order #48219</h1>
            <button className={styles.deletebutton}>Delete</button>
          </div>
          <div className={styles.dropdown}>
            <button className={styles.dropdownToggle} onClick={toggleDropdown}>
              Menu ▾
            </button>
            {isOpen && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <a href="#">completed</a>
                </li>
                <li>
                  <a href="#">not complete</a>
                </li>
                <li>
                  <a href="#">cancelled</a>
                </li>
              </ul>
            )}
          </div>
          <div className={styles.info}>
            <div className={styles.materialcost}>
              <div className={styles.materials}>
                <OrderPart />
                <OrderPart />
                <OrderPart />
              </div>
              <div className={styles.cost}></div>
            </div>
            <div className={styles.shipping}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

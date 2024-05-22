'use client';
import styles from './OrderCard.module.scss';
import Image from 'next/image';
import arrowRight from '/public/icons/arrow_right_line.svg';
import purpleCheck from '/public/icons/purple_check.svg';
import issue from '/public/icons/yellow_error.svg';
import error from '/public/icons/red_error.svg';
import greenCheck from '/public/icons/green_check.svg';

interface TextboxProps {
  title: string;
  date: Date;
  status: number;
  image: string;
  icon: number;
}

export default function OrderCard(props: TextboxProps) {
  const itemStatuses = [
    'Customer',
    'Payment',
    'Shipping',
    'Confirm',
    'Delivered',
  ];

  function displayIcon(status: number, icon: number, index: number) {
    if (index < status) {
      return purpleCheck;
    } else if (index === status) {
      if (icon === 0) {
        return purpleCheck;
      } else if (icon === 1) {
        return issue;
      } else if (icon === 2) {
        return error;
      } else {
        return greenCheck;
      }
    } else {
      return '';
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.item_image}>
        <Image src={props.image} alt="product image" fill={true} />
      </div>
      <div className={styles.item_info}>
        <h4>{props.title}</h4>
        <p>Order Placed: {props.date.toDateString()}</p>
        <div className={styles.item_status}>
          <div className={styles.status_bar}></div>
          {itemStatuses.map((status, index) => (
            <div key={index} className={styles.status_options}>
              {props.status <= 4 &&
              displayIcon(props.status, props.icon, index) !== '' ? (
                <Image
                  src={displayIcon(props.status, props.icon, index)}
                  alt="check icon"
                />
              ) : (
                <div className={styles.status_circle}></div>
              )}
              <p>{status}</p>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.info_button}>
        <Image src={arrowRight} alt="right arrow icon" />
      </button>
    </div>
  );
}

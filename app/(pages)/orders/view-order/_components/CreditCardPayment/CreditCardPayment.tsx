import Image from 'next/image';

import styles from './CreditCardPayment.module.scss';

export default function CreditCardPayment() {
  return (
    <div className={styles.container}>
      <HeaderContainer />
      <CardNumber />
      <CardOwner />
      <ExpiryDateCVV />
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className={styles.header_container}>
      <div className={styles.header}>
        <Image
          src="/icons/cards/credit_card.svg"
          alt="credit card icon"
          width={20}
          height={20}
        />
        Credit Card Payment
      </div>
      <Image
        src="/icons/cards/master_card.svg"
        alt="master card icon"
        width={40}
        height={20}
      />
    </div>
  );
}

function CardNumber() {
  return (
    <div className={styles.fields_container}>
      <div>Card number</div>
      <div
        className={`${styles.value} ${styles.right_justified} ${styles.card_number}`}
      >
        <Image
          src="/icons/cards/credit_card.svg"
          alt="credit card icon"
          width={20}
          height={20}
          className={styles.icon}
        />
        ****-****-****-1234
      </div>
    </div>
  );
}

function CardOwner() {
  return (
    <div className={styles.fields_container}>
      <div>Card owner</div>
      <div className={`${styles.value} ${styles.right_justified}`}>
        Victoria Wang
      </div>
    </div>
  );
}

function ExpiryDateCVV() {
  return (
    <div className={styles.row}>
      <div className={styles.fields_container}>
        <div>Expiry date</div>
        <div className={styles.right_justified}>
          <div className={styles.expiry_date}>
            <div className={styles.value}>08</div>/
            <div className={styles.value}>24</div>
          </div>
          <div className={`${styles.fields_container} ${styles.cvv}`}>
            <div>CVV</div>
            <div className={styles.value}>012</div>
          </div>
        </div>
      </div>
    </div>
  );
}

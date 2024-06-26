import Image from 'next/image';
import userIcon from '/public/icons/user.svg';

import styles from './ContactInfo.module.scss';

export default function ContactInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={userIcon} alt="user icon" />
        Contact Info
      </div>
      <div className={styles.data}>
        <DataField label="Name" value="Victoria Wang" />
        <DataField label="Address" value="123 Berry Street" />
        <DataField label="Phone Number" value="123 - 123 - 1234" />
        <DataField label="Email" value="victoria@gmail.com" />
      </div>
    </div>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

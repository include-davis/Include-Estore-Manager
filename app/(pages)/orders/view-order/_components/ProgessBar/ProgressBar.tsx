import Image from 'next/image';

import styles from './ProgressBar.module.scss';

export default function ProgressBar() {
  return (
    <div className={styles.progress_bar}>
      <StatusIcon status="finished" label="Customer" isAtLeftEnd={true} />
      <StatusIcon status="finished" label="Payment" />
      <StatusIcon status="inProgress" label="Shipping" />
      <StatusIcon status="incomplete" label="Confirm" />
      <StatusIcon status="incomplete" label="Delivered" isAtRightEnd={true} />
    </div>
  );
}

function StatusIcon({
  status,
  label,
  isAtLeftEnd = false,
  isAtRightEnd = false,
}: {
  status: string;
  label: string;
  isAtLeftEnd?: boolean;
  isAtRightEnd?: boolean;
}) {
  const iconPath = {
    finished: '/icons/status/complete.svg',
    inProgress: '/icons/status/in_progress.svg',
    incomplete: '/icons/status/incomplete.svg',
  }[status];
  const iconSize = 40;

  return (
    <div className={styles.status}>
      <div className={styles.icon}>
        <div className={`${styles.div} ${isAtLeftEnd ? styles.end_div : ''}`} />
        <Image
          src={iconPath!}
          width={iconSize}
          height={iconSize}
          alt="icon of order stage status"
        />
        <div
          className={`${styles.div} ${isAtRightEnd ? styles.end_div : ''}`}
        />
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

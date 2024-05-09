import Image from 'next/image';
import finishedIcon from '/public/icons/status/complete.svg';
import inProgressIcon from '/public/icons/status/in_progress.svg';
import incompleteIcon from '/public/icons/status/incomplete.svg';

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

interface StatusIconProps {
  status: string;
  label: string;
  isAtLeftEnd?: boolean;
  isAtRightEnd?: boolean;
}

function StatusIcon({
  status,
  label,
  isAtLeftEnd = false,
  isAtRightEnd = false,
}: StatusIconProps) {
  const icon = {
    finished: finishedIcon,
    inProgress: inProgressIcon,
    incomplete: incompleteIcon,
  }[status];

  return (
    <div className={styles.status}>
      <div className={styles.icon}>
        <div className={`${styles.div} ${isAtLeftEnd ? styles.end_div : ''}`} />
        <Image src={icon} alt="icon of order stage status" />
        <div
          className={`${styles.div} ${isAtRightEnd ? styles.end_div : ''}`}
        />
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

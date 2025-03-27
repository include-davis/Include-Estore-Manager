'use client';

import Image from 'next/image';
import { useState } from 'react';

import leftArrowIcon from '/public/icons/arrows/left.svg';
import rightArrowIcon from '/public/icons/arrows/right.svg';
import selectedIcon from '/public/icons/indicators/selected.svg';
import unselectedIcon from '/public/icons/indicators/unselected.svg';

import styles from './Navigator.module.scss';

export default function Navigator() {
  const arrowSize = 18;
  const [selected, setSelected] = useState(0);

  function decrSelected() {
    setSelected((selected - 1 + 5) % 5);
  }

  function incrSelected() {
    setSelected((selected + 1) % 5);
  }

  return (
    <div className={styles.navigator}>
      <div className={`${styles.arrow} ${styles.left_arrow}`}>
        <Image
          src={leftArrowIcon}
          width={arrowSize}
          height={arrowSize}
          alt="left arrow"
          onClick={() => decrSelected()}
        />
      </div>
      <Indicators selectedIndex={selected} />
      <div className={`${styles.arrow} ${styles.right_arrow}`}>
        <Image
          src={rightArrowIcon}
          width={arrowSize}
          height={arrowSize}
          alt="right arrow"
          onClick={() => incrSelected()}
        />
      </div>
    </div>
  );
}

function Indicators({ selectedIndex }: { selectedIndex: number }) {
  const indicatorSize = 12;
  const indicators = [];

  for (let i = 0; i < 5; i++) {
    if (i !== selectedIndex) {
      indicators.push(
        <Image
          src={unselectedIcon}
          width={indicatorSize}
          height={indicatorSize}
          alt="unselected indicator"
          key={i}
        />
      );
    } else {
      indicators.push(
        <Image
          src={selectedIcon}
          width={indicatorSize}
          height={indicatorSize}
          alt="selected indicator"
          key={i}
        />
      );
    }
  }

  return <>{indicators}</>;
}

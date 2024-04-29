'use client';

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

import styles from './Navigator.module.scss';

export default function Navigator() {
  const arrowSize = 18;
  const [selected, setSelected] = useState(0);

  function decrSelected() {
    if (selected === 0) {
      setSelected(4);
    } else {
      setSelected(selected - 1);
    }
  }

  function incrSelected() {
    if (selected === 4) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  }

  return (
    <div className={styles.navigator}>
      <div className={`${styles.arrow} ${styles.left_arrow}`}>
        <Image
          src="/icons/arrows/left.svg"
          width={arrowSize}
          height={arrowSize}
          alt="left arrow"
          onClick={() => decrSelected()}
        />
      </div>
      <Indicators selectedIndex={selected} />
      <div className={`${styles.arrow} ${styles.right_arrow}`}>
        <Image
          src="/icons/arrows/right.svg"
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
          src="/icons/indicators/unselected.svg"
          width={indicatorSize}
          height={indicatorSize}
          alt="unselected indicator"
          key={i}
        />
      );
    } else {
      indicators.push(
        <Image
          src="/icons/indicators/selected.svg"
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

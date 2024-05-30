'use client';

import { useState } from 'react';
import Image from 'next/image';
import chevronDownIcon from '/public/icons/chevron-down.svg';
import chevronUpIcon from '/public/icons/chevron-up.svg';
import clearIcon from '/public/icons/clear.svg';

import styles from './SearchFilters.module.scss';

const tags = ['Latest', 'Electronics', 'Kitchen', 'Clothes']; // populate from database

export default function SearchFilters() {
  const [optionsDisplayed, setOptionsDisplayed] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);

  function updateFilters(label: string) {
    if (filters.includes(label)) {
      setFilters(filters.filter((item) => item !== label));
    } else {
      setFilters([...filters, label]);
    }
    // update product list based on filters
  }

  return (
    <form className={styles.container}>
      <div className={styles.left_elements}>
        <div className={styles.search_bar}>
          <input
            type="text"
            placeholder="Search"
            className={styles.search_bar}
          />
          <button>Search</button>
        </div>
        <div className={styles.list}>
          {filters.map((filter) => (
            <div key={filter} className={styles.tag}>
              {filter}
              <Image
                src={clearIcon}
                alt="clear icon"
                onClick={() => updateFilters(filter)}
                className={styles.remove}
              />
            </div>
          ))}
          {filters.length > 0 && (
            <div
              onClick={() => {
                setFilters([]);
                setOptionsDisplayed(false);
              }}
              className={styles.clear_all}
            >
              Clear all filter
            </div>
          )}
        </div>
      </div>
      <div className={styles.select_filters}>
        <div
          className={styles.header}
          onClick={() => setOptionsDisplayed(!optionsDisplayed)}
        >
          Filter
          {optionsDisplayed ? (
            <Image src={chevronUpIcon} alt="chevron up icon" />
          ) : (
            <Image src={chevronDownIcon} alt="chevron down icon" />
          )}
        </div>
        <div
          className={
            optionsDisplayed ? styles.opt_list : styles.hidden_opt_list
          }
        >
          {tags.map((tag) => (
            <div
              key={tag}
              className={`${filters.includes(tag) && styles.selected_opt}`}
              onClick={() => updateFilters(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

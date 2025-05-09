'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.scss';

import { CgProfile } from 'react-icons/cg';
import { IoPricetagOutline } from 'react-icons/io5';
import { FiShoppingCart } from 'react-icons/fi';

interface NavLink {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  {
    name: 'Profile',
    slug: '/profile/account-settings',
    icon: <CgProfile size={25} className={styles.linkIcon} />,
  },
  {
    name: 'Product',
    slug: '/products',
    icon: <IoPricetagOutline size={25} className={styles.linkIcon} />,
  },
  {
    name: 'Order',
    slug: '/orders',
    icon: <FiShoppingCart size={25} className={styles.linkIcon} />,
  },
];

export default function Sidebar() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" onClick={() => setSelectedSlug(null)}>
            <span style={{ color: 'white' }}>#INCLUDE</span>
          </Link>
        </div>
      </div>
      <div className={styles.sidebarContent}>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.slug}
              href={link.slug}
              className={`${styles.linkItem} ${
                selectedSlug === link.slug ? styles.active : ''
              }`}
              onClick={() => handleSelect(link.slug)}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

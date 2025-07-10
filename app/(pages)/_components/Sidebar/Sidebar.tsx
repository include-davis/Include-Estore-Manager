'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { FiEdit, FiShoppingCart } from 'react-icons/fi';
import { RiFileList3Line } from 'react-icons/ri';

import styles from './Sidebar.module.scss';

interface NavLink {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  {
    name: 'Orders',
    slug: '/',
    icon: <RiFileList3Line size={25} className={styles.linkIcon} />,
  },
  {
    name: 'Product Listings',
    slug: '/products',
    icon: <FiShoppingCart size={25} className={styles.linkIcon} />,
  },
  {
    name: 'Edit Store',
    slug: '/profile/account-settings',
    icon: <FiEdit size={25} className={styles.linkIcon} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(pathname);

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

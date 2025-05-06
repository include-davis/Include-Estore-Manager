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
}

interface SidebarProps {
  navLinks: NavLink[];
}

function displayIconByName(name: string) {
  switch (name.toLowerCase()) {
    case 'home':
      return <IoPricetagOutline size={25} className={styles.linkIcon} />;
    case 'product':
      return <IoPricetagOutline size={25} className={styles.linkIcon} />;
    case 'order':
      return <FiShoppingCart size={25} className={styles.linkIcon} />;
    case 'profile':
      return <CgProfile size={25} className={styles.linkIcon} />;
    default:
      return <IoPricetagOutline size={25} className={styles.linkIcon} />;
  }
}


const Sidebar: React.FC<SidebarProps> = ({ navLinks }) => {
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
          <Link
            href="/profile/account-settings"
            className={`${styles.linkItem} ${
              selectedSlug === '/profile/account-settings' ? styles.active : ''
            }`}
            onClick={() => handleSelect('/profile/account-settings')}
          >
            {displayIconByName('profile')}
            <span>Profile</span>
          </Link>

          {navLinks
            .filter((link) => link.name.toLowerCase() !== 'home')
            .map((link) => (
              <Link
                key={link.slug}
                href={link.slug}
                className={`${styles.linkItem} ${
                  selectedSlug === link.slug ? styles.active : ''
                }`}
                onClick={() => handleSelect(link.slug)}
              >
                {displayIconByName(link.name)}
                <span>{link.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.scss';

import tag from '/public/icons/tag.svg';
import home from '/public/icons/home.svg';
import profile from '/public/icons/profile2.svg';
import orders from '/public/icons/shop.svg';

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
      return home;
    case 'product':
      return tag;
    case 'order':
      return orders;
    case 'profile':
      return profile;
    default:
      return tag;
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
          <span style={{ color: 'white' }}>#INCLUDE</span>
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
            <Image
              src={displayIconByName('profile')}
              alt="profile icon"
              width={25}
              height={25}
              className={styles.linkIcon}
            />
            <span>Profile</span>
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.slug}
              href={link.slug}
              className={`${styles.linkItem} ${
                selectedSlug === link.slug ? styles.active : ''
              }`}
              onClick={() => handleSelect(link.slug)}
            >
              <Image
                src={displayIconByName(link.name)}
                alt={`${link.name} icon`}
                width={25}
                height={25}
                className={styles.linkIcon}
              />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

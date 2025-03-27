'use client';

import Link from 'next/link';
import Image from 'next/image';

import eStoreIcon from '/public/icons/e_store_icon.svg';
import profileIcon from '/public/icons/profile.svg';

import styles from './Navbar.module.scss';
import { logout } from '@actions/Authorization';

export default function Navbar() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image
          src={eStoreIcon}
          alt="#include E-Store icon"
          width={120}
          height={120}
        />
      </Link>
      <Link href="/profile/account-settings">
        <Image src={profileIcon} alt="profile icon" width={24} height={24} />
      </Link>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

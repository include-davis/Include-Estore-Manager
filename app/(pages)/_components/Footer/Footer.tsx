import Image from 'next/image';
import Link from 'next/link';

import eStoreIcon from '/public/icons/e_store_icon.svg';

import styles from './Footer.module.scss';

interface NavLink {
  name: string;
  slug: string;
}

export default function Footer({ navLinks }: { navLinks: NavLink[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.left_elements}>
        <Image src={eStoreIcon} alt="#include E-Store icon" />
        <div className={styles.links}>
          {navLinks.map((link) => {
            return (
              <Link key={link.slug} href={link.slug}>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div>Designed & Developed by #include</div>
    </div>
  );
}

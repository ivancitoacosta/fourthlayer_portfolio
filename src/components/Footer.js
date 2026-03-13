"use client";
import styles from './Footer.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const year = new Date().getFullYear();
    const pathname = usePathname();

    const showBackButton = pathname === '/games' || pathname === '/web';

    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                © {year} fourthlayer. All rights reserved.
            </p>
            {showBackButton && (
                <div className={styles.backContainer}>
                    <Link href="/" className={styles.backButton}>⬅ Back Home</Link>
                </div>
            )}
        </footer>
    );
}

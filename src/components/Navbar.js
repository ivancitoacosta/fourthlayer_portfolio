import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Link href="/" className={styles.logo}>
                    fourthlayer ✨
                </Link>
            </div>
            <div className={styles.links}>
                {/* Future links could go here */}
            </div>
        </nav>
    );
}

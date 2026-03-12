import styles from './Footer.module.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                © {year} fourthlayer. All rights reserved.
            </p>
        </footer>
    );
}

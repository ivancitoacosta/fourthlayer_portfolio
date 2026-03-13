"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

const themeEmojis = {
  default: ['🌸', '✨', '☁️', '🫧', '🦋'],
  systems: ['⚙️', '💻', '☁️', '🔌', '💾'],
  games: ['🎮', '👾', '⭐', '❤️', '🕹️'],
  web: ['🌐', '🎨', '📱', '🖱️', '✨']
};

// A cleanly abstracted floating Emoji component using framer-motion
function FloatingEmoji({ emoji, idx }) {
  // Generate pseudo-random deterministic traits based on index
  const size = 30 + (idx % 4) * 15; // 30px to 75px
  const startX = 5 + (idx * 17) % 90; // spread horizontally 5% to 95%
  const duration = 8 + (idx % 6) * 3; // 8s to 23s floating time (faster)
  const delay = (idx * 0.4) % 3; // 0s to 3s delay (appear much faster)

  return (
    <motion.div
      initial={{ y: '110vh', x: `${startX}vw`, opacity: 0, rotate: -20 }}
      animate={{
        y: '-20vh',
        x: `${startX + (idx % 2 === 0 ? 10 : -10)}vw`,
        opacity: [0, 0.8, 0.8, 0],
        rotate: [-20, 20, -20, 20]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear'
      }}
      style={{
        position: 'absolute',
        zIndex: 1,
        fontSize: `${size}px`,
        pointerEvents: 'none',
        userSelect: 'none'
      }}
    >
      {emoji}
    </motion.div>
  );
}

export default function Home() {
  const [activeTheme, setActiveTheme] = useState('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to render backgrounds and framer motion emojis
  const renderBackgroundLayer = (themeName) => {
    const isActive = activeTheme === themeName;
    const Emojis = themeEmojis[themeName];

    return (
      <div className={`${styles.bgLayer} ${styles[themeName]} ${isActive ? styles.active : ''}`}>
        <AnimatePresence>
          {mounted && isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <FloatingEmoji key={`${themeName}-${i}`} emoji={Emojis[i % Emojis.length]} idx={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background Layers */}
      {renderBackgroundLayer('default')}
      {renderBackgroundLayer('systems')}
      {renderBackgroundLayer('games')}
      {renderBackgroundLayer('web')}

      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Welcome to fourthlayer</h1>
          <p className={styles.subtitle}>
            Building magical experiences through systems, games, and the web.
            Explore our cute little corner of the internet!
          </p>
        </div>

        <div className={styles.grid}>
          {/* Systems Card */}
          <div
            className={`${styles.card} ${styles.systems}`}
            onMouseEnter={() => setActiveTheme('systems')}
            onMouseLeave={() => setActiveTheme('default')}
          >
            <div className={styles.icon}>💻</div>
            <h2 className={styles.cardTitle}>Systems</h2>
            <p className={styles.cardDesc}>
              Robust and adorable backend systems that keep everything running smoothly and happily!
            </p>
            <button className={styles.button} disabled>Coming Soon ✨</button>
          </div>

          {/* Games Card */}
          <div
            className={`${styles.card} ${styles.games}`}
            onMouseEnter={() => setActiveTheme('games')}
            onMouseLeave={() => setActiveTheme('default')}
          >
            <div className={styles.icon}>🎮</div>
            <h2 className={styles.cardTitle}>Games</h2>
            <p className={styles.cardDesc}>
              Fun, colorful, and engaging games that will bring a smile to your face!
            </p>
            <Link href="/games" className={styles.button}>Play Games 🎲</Link>
          </div>

          {/* Web Card */}
          <div
            className={`${styles.card} ${styles.web}`}
            onMouseEnter={() => setActiveTheme('web')}
            onMouseLeave={() => setActiveTheme('default')}
          >
            <div className={styles.icon}>🌐</div>
            <h2 className={styles.cardTitle}>Web</h2>
            <p className={styles.cardDesc}>
              Beautiful, responsive, and super cute web applications tailored just for you!
            </p>
            <Link href="/web" className={styles.button}>View Web 🎨</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

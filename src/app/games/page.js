"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';
import ProjectCard from '../../components/ProjectCard';

const gameEmojis = ['🎮', '👾', '⭐', '❤️', '🕹️'];

function FloatingEmoji({ emoji, idx }) {
  const size = 30 + (idx % 4) * 15;
  const startX = 5 + (idx * 17) % 90;
  const duration = 8 + (idx % 6) * 3;
  const delay = (idx * 0.4) % 3;

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

export default function Games() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: 'Furrybets',
      description: 'A collection of engaging betting minigames with a unique theme. Features custom mechanics and addictive gameplay loops.',
      link: 'https://fourthlayer.itch.io/furrybets',
      icon: '🎰',
      image: '/furrybets.png'
    },
    {
      title: 'Zootherapy',
      description: 'An immersive simulation game where you manage a specialized clinic. Tailor sessions to client needs in this detailed management sim.',
      link: 'https://fourthlayer.itch.io/zootherapy',
      icon: '🏥',
      image: '/zootherapy.png'
    },
    {
      title: 'Tails & Cones',
      description: 'A casual game where you serve ice cream to adorable furry customers. Prepare the correct flavors and earn stars!',
      link: 'https://fourthlayer.itch.io/tails-cones',
      icon: '🍦',
      image: '/tailsandcones.png'
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.bgLayer} ${styles.games} ${styles.active}`}>
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <FloatingEmoji key={`games-${i}`} emoji={gameEmojis[i % gameEmojis.length]} idx={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Games by Fourthlayer</h1>
          <p className={styles.subtitle}>
            Fun, colorful, and engaging games that will bring a smile to your face!
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              theme="games"
            />
          ))}
        </div>
      </main>
    </div>
  );
}

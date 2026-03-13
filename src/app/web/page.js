"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';
import ProjectCard from '../../components/ProjectCard';

const webEmojis = ['🌐', '🎨', '📱', '🖱️', '✨'];

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

export default function Web() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: 'CrackList',
      description: 'A platform to create and vote on the best rankings. Rank everything from movies to food! Built with Next.js.',
      link: 'https://cracklist.space/',
      icon: '🏆',
      image: '/cracklist.png'
    },
    {
      title: 'Pawcast Radio',
      description: 'An AI-powered radio station broadcasting tech news 24/7. Features real-time commentary and automated news curation.',
      link: 'https://pawcast-radio.vercel.app/',
      icon: '📻',
      image: '/pawcast.png'
    },
    {
      title: 'Pico Pregona',
      description: 'A local directory and marketplace platform connecting businesses and the community. Built with Next.js.',
      link: 'https://pico-pregona.vercel.app/',
      icon: '🏪',
      image: '/picopregona.png'
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.bgLayer} ${styles.web} ${styles.active}`}>
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <FloatingEmoji key={`web-${i}`} emoji={webEmojis[i % webEmojis.length]} idx={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className={styles.container}>
        <div className={styles.hero}>
          <Link href="/" className={styles.backButton}>⬅ Back Home</Link>
          <h1 className={styles.title}>Web by Fourthlayer</h1>
          <p className={styles.subtitle}>
            Beautiful, responsive, and super cute web applications tailored just for you!
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              theme="web"
            />
          ))}
        </div>
      </main>
    </div>
  );
}

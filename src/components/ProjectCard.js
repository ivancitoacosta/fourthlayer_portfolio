import styles from './ProjectCard.module.css';
import Image from 'next/image';

export default function ProjectCard({ title, description, link, image, icon, ctaText = "View Project", theme = "default" }) {
  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      {image ? (
        <div className={styles.imageContainer}>
          <Image src={image} alt={title} fill className={styles.image} />
        </div>
      ) : (
        <div className={styles.icon}>{icon}</div>
      )}
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDesc}>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.button}>
        {ctaText}
      </a>
    </div>
  );
}

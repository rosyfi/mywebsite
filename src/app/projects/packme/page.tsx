import Link from "next/link";
import styles from "./page.module.css";

export default function PackMePage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <span className={styles.tag}>coming soon</span>
        <h1 className={styles.title}>PackMe</h1>
        <p className={styles.message}>This case study is still in progress.</p>
        <p className={styles.sub}>Check back soon</p>
        <Link href="/#projects" className={styles.back}>
          ← Back to projects
        </Link>
      </div>
    </main>
  );
}

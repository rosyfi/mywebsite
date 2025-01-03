import styles from "./page.module.css";
import Startseite from "./content/Startseite";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Startseite />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

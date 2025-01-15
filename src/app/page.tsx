import styles from "./page.module.css";
import Home from "./content/Home";
import About from "./content/About";

export default function App() {
  return (
    <main className={styles.container}>
      <Home />
      <About />
    </main>
  );
}

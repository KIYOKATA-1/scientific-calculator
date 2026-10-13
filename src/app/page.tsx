import Calculator from "./components/Calculator/Calculator";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <Calculator />
    </main>
  );
}
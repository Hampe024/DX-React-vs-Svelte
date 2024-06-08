import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/graph">GDP graph</a>
        <a href="/weather">Weather</a>
    </nav>
  );
}

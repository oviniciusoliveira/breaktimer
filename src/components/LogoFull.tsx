import styles from "./../styles/components/LogoFull.module.css";

export default function LogoFull() {
  return (
    <div className={styles.logoContainer}>
      <img
        className={styles.logoImage}
        src="/logo-white.svg"
        alt="Logo BreakTimer"
      />
      <span className={styles.logoTitle}>
        Break<span style={{ color: `var(--green)` }}>.</span>Timer
      </span>
    </div>
  );
}

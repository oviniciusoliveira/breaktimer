import styles from "./../styles/components/ToggleTheme.module.css";
import { FaSun, FaMoon } from "react-icons/fa";

export function ToggleTheme() {
  return (
    <div className={styles.container}>
      <button type="button">
        <FaSun size={28} />
      </button>
    </div>
  );
}

import styles from "./../styles/components/ToggleTheme.module.css";
import Cookies from "js-cookie";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

export function ToggleTheme() {
  const [theme, setTheme] = useState("light");
  const cookieTheme = Cookies.get("theme");

  useEffect(() => {
    if (cookieTheme) {
      document.documentElement.setAttribute("data-theme", cookieTheme);
      setTheme(cookieTheme);
    }
  }, []);

  function handleThemeSwitch() {
    const htmlTheme = document.documentElement.getAttribute("data-theme");

    if (htmlTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
      Cookies.set("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
      Cookies.set("theme", "light");
    }
  }

  return (
    <div className={styles.container}>
      <button type="button" onClick={handleThemeSwitch}>
        {theme === "light" ? <FaSun size={28} /> : <FaMoon size={28} />}
      </button>
    </div>
  );
}

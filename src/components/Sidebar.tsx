import styles from "./../styles/components/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaMedal, FaPowerOff } from "react-icons/fa";
import { ToggleTheme } from "./ToggleTheme";
import { signOut } from "next-auth/client";

export function Sidebar() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <img src="/logo.svg" alt="Logo BreakTimer" />
      <nav>
        <div
          className={
            router.pathname === "/" ? styles.navItemSelected : styles.navItem
          }
        >
          <Link href="/">
            <a>
              <FaHome size={24} />
            </a>
          </Link>
        </div>
        <div
          className={
            router.pathname === "/ranking"
              ? styles.navItemSelected
              : styles.navItem
          }
        >
          <Link href="/ranking">
            <a>
              <FaMedal size={24} />
            </a>
          </Link>
        </div>
        <div onClick={() => signOut()} className={styles.navItem}>
          <FaPowerOff size={24} />
        </div>
      </nav>
      <ToggleTheme />
    </div>
  );
}

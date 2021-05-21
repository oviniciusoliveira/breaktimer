import Head from "next/head";
import styles from "./../styles/pages/Login.module.css";
import { FaArrowRight } from "react-icons/fa";
import LogoFull from "../components/LogoFull";
import { useSession, signIn } from "next-auth/client";
import Redirect from "../components/Redirect";

export default function Login() {
  const [session] = useSession();

  if (session) return <Redirect to="/" />;

  return (
    <>
      <Head>
        <title>Login | BreakTimer</title>
      </Head>
      <img
        className={styles.backgroundLogo}
        src="/background-logo.svg"
        alt="Logo BreakTimer"
      />
      <div className={styles.container}>
        <main className={styles.loginContainer}>
          <LogoFull />
          <h2>Bem-vindo</h2>
          <div>
            <img src="/icons/github.svg" alt="Github" />
            <p>Faça login com seu Github para começar</p>
          </div>
          <button
            type="button"
            className={styles.githubLogin}
            onClick={() => signIn()}
          >
            <span>Logar com Github</span>
            <div>
              <FaArrowRight />
            </div>
          </button>
        </main>
      </div>
    </>
  );
}

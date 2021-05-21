import Head from "next/head";
import styles from "./../styles/pages/Ranking.module.css";

export default function Ranking() {
  return (
    <>
      <Head>
        <title>Ranking | BreakTimer</title>
      </Head>
      <div className={styles.container}>
        <h1>Ranking</h1>
      </div>
    </>
  );
}

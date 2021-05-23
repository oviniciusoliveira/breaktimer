import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./../styles/pages/Ranking.module.css";
import { LeaderboardProfile, User } from "./../components/LeaderboardProfile";
import { useSession } from "next-auth/client";
import Redirect from "../components/Redirect";

export default function Ranking() {
  const [session] = useSession();
  if (!session) return <Redirect to="/login" />;

  const [users, setUsers] = useState<User[]>([]);

  const [isMobileSize, setIsMobileSize] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 720) {
      setIsMobileSize(true);
    }

    async function getUsers() {
      const { data } = await axios.post("/api/server/users");
      if (data.length > 0) {
        data.sort((firstUser: User, secondUser: User) => {
          return firstUser.totalExperience > secondUser.totalExperience
            ? -1
            : 1;
        });
        setUsers(data);
      }
    }
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Ranking | BreakTimer</title>
      </Head>
      <div className={styles.container}>
        <h1>Classificação</h1>
        <div className={styles.boardTitle}>
          <div className={styles.position}>
            <p>Posição</p>
          </div>
          <div className={styles.user}>
            <p>Usuário</p>
          </div>
          <div className={styles.challenges}>
            <p>Desafios</p>
          </div>
          <div className={styles.experience}>
            <p>{isMobileSize ? " Exp" : " Experiência"}</p>
          </div>
        </div>
        {users &&
          users.map((user, index) => (
            <LeaderboardProfile key={index} user={user} rank={index + 1} />
          ))}
      </div>
    </>
  );
}

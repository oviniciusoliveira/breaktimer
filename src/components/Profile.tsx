import { useSession } from "next-auth/client";
import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "./../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const [session] = useSession();
  console.log("session profile", session);
  console.log("userid", session.userId);

  return (
    <div className={styles.profileContainer}>
      <img src={session.user.image} alt="Vinícius Oliveira" />
      <div>
        <strong>{session.user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level Icon" />
          Level {level}
        </p>
      </div>
    </div>
  );
}

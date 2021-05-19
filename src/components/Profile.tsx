import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "./../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/63078274?s=400&u=c3cac14e840dbacdea7d9cc549fc40d572185aab&v=4"
        alt="Vinícius Oliveira"
      />
      <div>
        <strong>Vinícius Oliveira</strong>
        <p>
          <img src="icons/level.svg" alt="Level Icon" />
          Level {level}
        </p>
      </div>
    </div>
  );
}

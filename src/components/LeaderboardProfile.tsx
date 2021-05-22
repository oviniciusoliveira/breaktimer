import { useEffect, useState } from "react";
import styles from "../styles/components/LeaderboardProfile.module.css";

export interface User {
  challengesCompleted: number;
  currentExperience: number;
  image: string;
  level: number;
  name: string;
  totalExperience: number;
  userId: string;
}

interface LeaderboardProfileProps {
  user: User;
  rank: number;
}

export function LeaderboardProfile({ user, rank }: LeaderboardProfileProps) {
  const [isMobileSize, setIsMobileSize] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 550) {
      setIsMobileSize(true);
    }
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.userPosition}>
          <span>{rank}</span>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <img src={user.image} alt={user.name} />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              <strong>{user.name}</strong>
            </div>
            <div className={styles.userLevel}>
              <p>
                <img src="icons/level.svg" alt="level" />
                Level {user.level}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.userChallenges}>
          <p>
            <span>{user.challengesCompleted}</span> completados
          </p>
        </div>
        <div className={styles.userExperience}>
          <p>
            <span>{user.totalExperience}</span>xp
          </p>
        </div>
      </div>
    </>
  );
}

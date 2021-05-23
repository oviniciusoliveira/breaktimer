import Head from "next/head";
import { GetServerSideProps } from "next";

import { useSession } from "next-auth/client";

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import { CountdownProvider } from "../contexts/CountdownContext";
import {
  ChallengesContext,
  ChallengesProvider,
} from "../contexts/ChallengesContext";

import styles from "./../styles/pages/Home.module.css";

import Redirect from "./../components/Redirect";
import { useContext, useEffect, useState } from "react";

// interface HomeProps {
//   level: number;
//   currentExperience: number;
//   challengesCompleted: number;
// }

export default function Home() {
  const [session] = useSession();
  const { activeChallenge } = useContext(ChallengesContext);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (activeChallenge) {
      setPosition(1);
    } else {
      setPosition(2);
    }
  }, [activeChallenge]);

  if (!session) return <Redirect to="/login" />;
  return (
    <ChallengesProvider
    // level={props.level}
    // currentExperience={props.currentExperience}
    // challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | BreakTimer</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { level, currentExperience, challengesCompleted } = context.req.cookies;

//   return {
//     props: {
//       level: Number(level),
//       currentExperience: Number(currentExperience),
//       challengesCompleted: Number(challengesCompleted),
//     },
//   };
// };

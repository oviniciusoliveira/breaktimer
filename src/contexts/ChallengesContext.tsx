import { createContext, useState, ReactNode, useEffect } from "react";
// import Cookies from "js-cookie";
import challenges from "./../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";
import { useSession } from "next-auth/client";
import axios from "axios";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  name: string;
  profilePicture: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  closeLevelUpModal: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  // level: number;
  // currentExperience: number;
  // challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [session] = useSession();

  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [level, setLevel] = useState(1);
  const [totalExperience, setTotalExperience] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
    async function getUser() {
      if (session) {
        const { data } = await axios.post("api/server/user", {
          userId: session.userId,
        });
        setName(data.name);
        setProfilePicture(data.image);
        setLevel(data.level);
        setCurrentExperience(data.currentExperience);
        setChallengesCompleted(data.challengesCompleted);
        setTotalExperience(data.totalExperience);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    // Cookies.set("level", String(level));
    // Cookies.set("currentExperience", String(currentExperience));
    // Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("BreakTime! Você tem um novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    let newLevel = level + 1;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted((challenges) => challenges + 1);
    setTotalExperience((experience) => experience + amount);
 
    updateUser(
      newLevel,
      finalExperience,
      totalExperience + amount,
      challengesCompleted + 1
    );
  }

  async function updateUser(
    level: number,
    currentExperience: number,
    totalExperience: number,
    challengesCompleted: number
  ) {
    await axios.post("api/server/updateUser", {
      userId: session.userId,
      level,
      currentExperience,
      totalExperience,
      challengesCompleted,
    });
  }

  return (
    <ChallengesContext.Provider
      value={{
        name,
        profilePicture,
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        closeLevelUpModal,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}

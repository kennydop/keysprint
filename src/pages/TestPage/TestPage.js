import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import styles from "./TestPage.module.css";

const generatePassage = (level) => {
  const passages = {
    1: "asdfjkl; aaa sss ddd fff jjj kkk lll ;;; ak df s k d sd lkj ; dkjh sdjzdk",
    2: "The cat sat on the mat.",
    3: "Rain rain go away, come again another day.",
    // ... more passages for different levels
  };
  return passages[level];
};

const TestPage = () => {
  const { progress } = useUser();
  const [passage, setPassage] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const generated = generatePassage(progress.checkpoint);
    setPassage(generated);
  }, [progress.checkpoint]);

  const renderedInput = [...userInput].map((char, index) => {
    if (passage === undefined) return "";
    const isCorrect = char === passage[index];
    return (
      <span
        key={index}
        className={isCorrect ? styles.correct : styles.incorrect}
      >
        {char}
      </span>
    );
  });

  return passage == null || passage === undefined ? (
    <div>Please watch the previous video first</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.passageContainer}>
        <p className={styles.backgroundPassage}>{passage}</p>
        <p className={styles.userInput}>{renderedInput}</p>
      </div>
      <textarea
        className={styles.hiddenTextarea}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        autoFocus
      />
    </div>
  );
};

export default TestPage;

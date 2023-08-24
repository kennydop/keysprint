import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import styles from "./TestPage.module.css";
import LevelCompleteModal from "../../components/Modals/LevelCompleteModal";

const generatePassage = (level) => {
  const passages = {
    1: "asdfjkl; aaa sss ddd fff jjj kkk lll ;;; ak df s k d sd lkj ; dkjh sdjdk",
    2: "The cat sat on the mat.",
    3: "Rain rain go away, come again another day.",
    // ... more passages for different levels
  };
  return passages[level];
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const TestPage = () => {
  const { progress } = useUser();
  const [passage, setPassage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWPM] = useState(0);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateWPM = (input) => {
    if (!startTime) return;

    const timeElapsed = Date.now() - startTime; // in milliseconds
    const timeElapsedInMinutes = timeElapsed / 60000; // convert to minutes

    const numberOfWords = input.length / 5;
    const currentWPM = numberOfWords / timeElapsedInMinutes;

    setWPM(Math.round(currentWPM)); // Round to an integer
  };

  const handleInputChange = (e) => {
    // Ensure the user does not delete characters
    if (e.target.value.length > userInput.length) {
      setUserInput(e.target.value);
    }

    const currentInput = e.target.value;

    // Start the timer when the user starts typing
    if (startTime === null && currentInput.length > 0) {
      setStartTime(Date.now());
      // Start an interval to update the timer
      const interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1); // Increment the timer every second
      }, 1000);
      setTimerInterval(interval);
    }

    // Calculate accuracy
    const correctChars = currentInput
      .split("")
      .filter((char, index) => char === passage[index]).length;
    const accuracy = (correctChars / passage.length) * 100;
    setAccuracy(accuracy);

    if (currentInput.length === passage.length) {
      setIsModalOpen(true); // Open the modal
      clearInterval(timerInterval); // Stop the timer
    }

    // Clear the previous timeout (if it exists)
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout
    const timeout = setTimeout(() => {
      calculateWPM(currentInput);
    }, 500); // 500 milliseconds (0.5 seconds) debounce time

    setDebounceTimeout(timeout);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const generated = generatePassage(progress.level);
    setPassage(generated);
  }, [progress.level]);

  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval]);

  const displayedText = [...passage].map((char, index) => {
    const userChar = userInput[index];
    if (userChar == null) {
      return (
        <span key={index} className={styles.pending}>
          {char}
        </span>
      );
    }
    const isCorrect = userChar === char;
    return (
      <span
        key={index}
        className={isCorrect ? styles.correct : styles.incorrect}
      >
        {userChar}
      </span>
    );
  });

  return (
    <div className={styles.container}>
      {passage == null || passage === undefined ? (
        <div>Please watch the previous video first</div>
      ) : (
        <div className={styles.testAreaContainer}>
          <div className={styles.testStatsContainer}>
            <span>WPM: {wpm}</span>
            <span>Accuracy: {Math.round(accuracy)}%</span>
            <span>Time: {formatTime(timeElapsed)}</span>
          </div>
          <div className={styles.passageContainer}>
            <p>{displayedText}</p>
          </div>
          <div className={styles.hiddenTextareaContainer}>
            <textarea
              className={styles.hiddenTextarea}
              value={userInput}
              onChange={handleInputChange}
              maxLength={passage.length}
              autoFocus
              spellCheck={false}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onSelect={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (
                  [
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                    "Home",
                    "End",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      )}
      <LevelCompleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        wpm={wpm}
        awpm={progress.awpm + wpm / (progress.awpm === 0 ? 1 : 2)}
        accuracy={accuracy}
        time={formatTime(timeElapsed)}
      />
    </div>
  );
};

export default TestPage;

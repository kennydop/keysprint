import React, { useEffect, useState, useRef } from "react";
import styles from "./TutorialPage.module.css";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ContinueIcon from "../../components/Icons/ContinueIcon";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

const levelVideo = {
  0.5: "https://www.youtube.com/embed/YlBZ2Jd68lY",
  1.5: "https://www.youtube.com/embed/YlBZ2Jd68lY",
  2.5: "https://www.youtube.com/embed/YlBZ2Jd68lY",
  3.5: "https://www.youtube.com/embed/A-CT48rRi3M",
  4.5: "https://www.youtube.com/embed/A-CT48rRi3M",
  5.5: "https://www.youtube.com/embed/A-CT48rRi3M",
  6.5: "https://www.youtube.com/embed/b-6YH-Y55TA",
  7.5: "https://www.youtube.com/embed/b-6YH-Y55TA",
  8.5: "https://www.youtube.com/embed/b-6YH-Y55TA",
  9.5: "https://www.youtube.com/embed/b-6YH-Y55TA",
};

const TutorialPage = () => {
  const { user, progress, updateProgress } = useUser();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const youtubePlayerRef = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (loading) return;
    setLoading(true);
    if (
      progress.checkpoint < 10 &&
      !localStorage.getItem(`${progress.checkpoint}-cpUpdated`) &&
      progress.checkpoint % 0.5 === 0
    ) {
      await updateProgress(user, { checkpoint: progress.checkpoint + 0.5 });
      localStorage.setItem(`${progress.checkpoint + 0.5}-cpUpdated`, "true");
    }

    navigate("/test");
    setLoading(false);
  };

  useEffect(() => {
    setButtonEnabled(false);

    // Enable the button after 260 seconds
    const timeoutId = setTimeout(() => {
      setButtonEnabled(true);
    }, 5 * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.vidContainer}>
          <iframe
            ref={youtubePlayerRef}
            id={`ks_c_${progress.checkpoint}`}
            title="keysprint-videos"
            width="640"
            height="360"
            src={levelVideo[progress.checkpoint]}
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className="bottomBtnContainer">
          <div
            style={{
              width: "25%",
            }}
          >
            {isButtonEnabled ? (
              loading ? (
                <LoadingIndicator />
              ) : (
                <button onClick={handleButtonClick}>
                  <span>Continue</span>
                  <ContinueIcon />
                </button>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;

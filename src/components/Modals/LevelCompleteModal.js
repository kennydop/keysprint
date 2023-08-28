import confetti from "../../assets/images/confetti.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./LevelCompleteModal.module.css";
import ContinueIcon from "../Icons/ContinueIcon";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const LevelCompleteModal = ({
  isOpen,
  onClose,
  wpm,
  awpm,
  accuracy,
  average_accuracy,
  time,
  passed,
  passingWPM,
  retake,
}) => {
  const { user, progress, updateProgress } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalTitleBar}>
          {passed ? (
            <h2>Test Completed!</h2>
          ) : (
            <>
              <h2>Test Failed!</h2>

              <p style={{ color: "red", margin: "15px 0px" }}>
                You need to score a <b>WPM</b> of not less than{" "}
                <b>{passingWPM}</b> and an <b>accuracy</b> of not less than{" "}
                <b>80%</b> to pass this test.
              </p>
            </>
          )}
        </div>
        {passed && (
          <div className={styles.imgContainer}>
            <img src={confetti} alt="Confetti" width={150} height={150} />
          </div>
        )}
        {/* <div className={styles.infoContainer}> */}
        <div className={styles.modalInfoRow}>
          <span>Words Per Minute (WPM):</span>
          <span className={styles.infoValue}>{wpm}</span>
        </div>
        <div className={styles.modalInfoRow}>
          <span>Average Words Per Minute (AWPM):</span>
          <span className={styles.infoValue}>{Math.round(awpm)}</span>
        </div>
        <div className={styles.modalInfoRow}>
          <span>Accuracy:</span>
          <span className={styles.infoValue}>{Math.round(accuracy)}%</span>
        </div>
        <div className={styles.modalInfoRow}>
          <span>Average Accuracy:</span>
          <span className={styles.infoValue}>
            {Math.round(average_accuracy)}%
          </span>
        </div>
        <div className={styles.modalInfoRow}>
          <span>Time Taken:</span>
          <span className={styles.infoValue}>{time}</span>
        </div>
        {/* </div> */}
        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className={styles.btnsContainer}>
            <button
              className="reverse_btn_theme"
              onClick={() => {
                if (loading) return;
                setLoading(true);
                retake();
                setLoading(false);
              }}
            >
              <span>Retake</span>
              <FontAwesomeIcon icon={faRotateRight} color="4958f8" />
            </button>
            {passed && (
              <button
                onClick={async () => {
                  if (loading) return;
                  setLoading(true);
                  await updateProgress(user, {
                    checkpoint: progress.checkpoint + 0.5,
                    level: progress.level + 1,
                    tests_completed: progress.tests_completed + 1,
                    accumulated_accuracies:
                      progress.accumulated_accuracies + accuracy,
                    accumulated_wpms: progress.accumulated_wpms + wpm,
                    aacc: average_accuracy,
                    awpm: awpm,
                  });
                  navigate("/tutorial");
                  setLoading(false);
                }}
              >
                <span>Continue</span>
                <ContinueIcon />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelCompleteModal;

import confetti from "../../assets/images/confetti.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./LevelCompleteModal.module.css";
import { Link } from "react-router-dom";
import ContinueIcon from "../Icons/ContinueIcon";

const LevelCompleteModal = ({
  isOpen,
  onClose,
  wpm,
  awpm,
  accuracy,
  average_accuracy,
  time,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalTitleBar}>
          <h2>Test Completed!</h2>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onClose}
            color="red"
            cursor={"pointer"}
          />
        </div>
        <div className={styles.imgContainer}>
          <img src={confetti} alt="Confetti" width={150} height={150} />
        </div>
        {/* <div className={styles.infoContainer}> */}
        <div className={styles.modalInfoRow}>
          <span>Words Per Minute (WPM):</span>
          <span className={styles.infoValue}>{wpm}</span>
        </div>
        <div className={styles.modalInfoRow}>
          <span>Average Words Per Minute (AWPM):</span>
          <span className={styles.infoValue}>{awpm}</span>
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
        <div className={styles.btnsContainer}>
          {/* <Link to="/test"> */}
          <button className="reverse_btn_theme">
            <span>Retake</span>
            <FontAwesomeIcon icon={faRotateRight} color="4958f8" />
          </button>
          {/* </Link> */}
          <button onClick={onClose}>
            <span>Continue</span>
            <ContinueIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelCompleteModal;

import React from "react";
import { Link } from "react-router-dom";
import ProgressIndicator from "../../components/ProgressIndicator/ProgressIndicator";
import "./LaunchPage.css";
import { useUser } from "../../contexts/UserContext";
import ContinueIcon from "../../components/Icons/ContinueIcon";

const levelTitle = {
  1: "Beginner",
  2: "Beginner",
  3: "Beginner",
  4: "Intermediate",
  5: "Intermediate",
  6: "Intermediate",
  7: "Advanced",
  8: "Advanced",
  9: "Advanced",
  10: "Expert",
};

const checkpointUrl = {
  0.5: "tutorial",
  1: "test",
  1.5: "tutorial",
  2: "test",
  2.5: "tutorial",
  3: "test",
  3.5: "tutorial",
  4: "test",
  4.5: "tutorial",
  5: "test",
  5.5: "tutorial",
  6: "test",
  6.5: "tutorial",
  7: "test",
  7.5: "tutorial",
  8: "test",
  8.5: "tutorial",
  9: "test",
  9.5: "tutorial",
  10: "test",
};

const LaunchPage = () => {
  const { user, progress } = useUser();

  return (
    <div className="main-content">
      <ProgressIndicator value={(progress.checkpoint - 0.5) / 10} />
      <div className="lpr_container">
        <div className="user-info">
          <h2>{user.displayName}</h2>
          <p>
            Level:{" "}
            <span className="lp_info">
              {levelTitle[progress.level > 10 ? 10 : progress.level]}
            </span>
          </p>
          <p>
            Average Accuracy:{" "}
            <span className="lp_info">{Math.round(progress.aacc)}</span>
          </p>
          <p>
            AWPM: <span className="lp_info">{Math.round(progress.awpm)}</span>
          </p>
          {/* <p>
            Global Rank: <span className="lp_info">{progress.rank}</span>
          </p> */}
        </div>
        <Link
          to={`${
            checkpointUrl[progress.checkpoint > 10 ? 10 : progress.checkpoint]
          }`}
          style={{ textDecoration: "none" }}
        >
          <button className="continue-btn">
            <span>{progress.checkpoint === 0.5 ? "Start" : "Continue"}</span>
            <ContinueIcon />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LaunchPage;

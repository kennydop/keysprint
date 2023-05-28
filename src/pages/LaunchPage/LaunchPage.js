import React from "react";
import { Link } from "react-router-dom";
import ProgressIndicator from "../../components/ProgressIndicator/ProgressIndicator";
import "./LaunchPage.css";
import { useUser } from "../../contexts/UserContext";

const levelTitle = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};
const LaunchPage = () => {
  const { user, progress } = useUser();
  console.log(progress);

  return (
    <div className="main-content">
      <ProgressIndicator value={0.6} />
      <div className="lpr_container">
        <div className="user-info">
          <h2>{progress.displayName}</h2>
          <p>
            Level: <span className="lp_info">{levelTitle[progress.level]}</span>
          </p>
          <p>
            Average Accuracy: <span className="lp_info">{progress.aacc}</span>
          </p>
          <p>
            AWPM: <span className="lp_info">{progress.awpm}</span>
          </p>
          {/* <p>
            Global Rank: <span className="lp_info">{progress.rank}</span>
          </p> */}
        </div>
        <Link to="/menu" style={{ textDecoration: "none" }}>
          <button className="continue-btn">
            <span>Continue</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="arrow-right-alt"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path
                d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"
                fill="#ffffff"
                className="color000 svgShape"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LaunchPage;

import React, { useEffect, useState } from "react";
import "./ProgressIndicator.css";

function ProgressBar({ speed = 1, value = 0 }) {
  const [progressValue, setProgressValue] = useState(0);
  const [speedValue, setSpeedValue] = useState(speed);
  const progressEndValue = value * 100;

  useEffect(() => {
    const progress = setInterval(() => {
      setProgressValue((prevValue) => {
        if (prevValue < progressEndValue) {
          return prevValue + 1;
        }
        clearInterval(progress);
        return prevValue;
      });

      setSpeedValue((prevValue) => {
        if (prevValue > 0) {
          return prevValue + 0.5;
        }
        return prevValue;
      });
    }, speedValue);
    return () => clearInterval(progress);
  }, [speedValue, progressEndValue]);

  return (
    <div
      className="circular-progress"
      style={{
        background: `conic-gradient(#4958f8 ${
          progressValue * 3.6
        }deg, #cadcff ${progressValue * 3.6}deg)`,
      }}
    >
      <div className="value-container">{progressValue}%</div>
    </div>
  );
}

export default ProgressBar;

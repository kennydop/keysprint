import React, { useState, useEffect } from "react";
import "./LoadingIndicator.css";

const LoadingIndicator = () => {
  const [loading, setLoading] = useState("Loading");

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading((loading) => {
        // Use the latest state here
        if (loading === "Loading...") {
          return "Loading";
        } else {
          return loading + ".";
        }
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="LoadingIndicator">
      <span>{loading}</span>
      <span className="cursor">_</span>
    </div>
  );
};

export default LoadingIndicator;

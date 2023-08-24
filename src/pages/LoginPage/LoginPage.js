import "./LoginPage.css";
import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../../services/firebase";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { getError } from "../../helpers/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faG } from "@fortawesome/free-solid-svg-icons";

const db = getFirestore();

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeAuthMethod, setActiveAuthMethod] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleAccountCreation = async (e) => {
    e.preventDefault();
    if (username === "") {
      setError("Username is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Store user information in Firestore
        updateProfile(user, {
          displayName: username,
          photoURL: `https://placeholder-avatars.herokuapp.com/?name=${email}&type=pattern&color=4958f8&bg=cadcff`,
        });
        setDoc(doc(db, "users", user.uid), {
          displayName: username,
          email: user.email,
          photoURL: `https://placeholder-avatars.herokuapp.com/?name=${email}&type=pattern&color=4958f8&bg=cadcff`,
          level: 1,
          checkpoint: 0.5,
          awpm: 0,
          aacc: 0,
          tests_completed: 0,
        });
      })
      .catch((error) => {
        console.log(error.code);
        setError(getError(error.code));
        setLoading(false);
      });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Store user information in Firestore
        setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          // photoURL: `https://placeholder-avatars.herokuapp.com/?name=${email}&type=pattern&color=4958f8&bg=cadcff`,
          level: 1,
          checkpoint: 0.5,
          awpm: 0,
          aacc: 0,
          accessToken: token,
          tests_completed: 0,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.code);
        setError(getError(error.code));
        // The email of the user's account used.
        // const email = error.email;
        // The Firebase AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setLoading(false);
      });
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Successful login
      })
      .catch((error) => {
        // Handle error

        console.log(error.code);
        setError(getError(error.code));
        setLoading(false);
      });
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="lp_header">
          <h3>keysprint_</h3>
          <p>
            <span
              onClick={() => setActiveAuthMethod("login")}
              style={
                activeAuthMethod === "login"
                  ? {
                      color: "#4958f8",
                      textDecoration: "underline #4958f8",
                    }
                  : {}
              }
            >
              login
            </span>
            /
            <span
              onClick={() => setActiveAuthMethod("signup")}
              style={
                activeAuthMethod === "signup"
                  ? {
                      color: "#4958f8",
                      textDecoration: "underline #4958f8",
                    }
                  : {}
              }
            >
              signup
            </span>
          </p>
        </div>
        <p
          className="error"
          style={{
            display: error === "" || error === null ? "none" : "block",
          }}
        >
          {error}
        </p>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <form className="form">
            {activeAuthMethod === "login" ? (
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
            )}
            <div className="lp_btns-container">
              <button
                onClick={
                  activeAuthMethod === "login"
                    ? handleEmailPasswordLogin
                    : handleAccountCreation
                }
              >
                <span>
                  {activeAuthMethod === "login"
                    ? "Log in with email/password"
                    : "Sign up with email/password"}
                </span>
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
              <button onClick={handleGoogleLogin}>
                <span>
                  {activeAuthMethod === "login"
                    ? "Log in with Google"
                    : "Sign up with Google"}
                </span>
                <FontAwesomeIcon icon={faG} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;

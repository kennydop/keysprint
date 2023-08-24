import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

import { useContext, useState, useEffect, createContext } from "react";
import LoginPage from "../pages/LoginPage/LoginPage";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) await getProgress(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, [auth]);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const getProgress = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProgress(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const updateProgress = async (user, p) => {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, p);
    // update local progress
    setProgress({ ...progress, ...p });
  };

  return loading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingIndicator />
    </div>
  ) : user ? (
    <UserContext.Provider
      value={{
        user,
        setUser,
        progress,
        setProgress,
        getProgress,
        updateProgress,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  ) : (
    <LoginPage />
  );
};

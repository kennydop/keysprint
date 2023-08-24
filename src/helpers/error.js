const errorCodes = {
  "auth/network-request-failed": "Check your internet connection and try again",
  "auth/user-not-found": "Incorrect email or password",
  "auth/weak-password": "Password must be of length 6",
  "auth/popup-closed-by-user": "Popup was closed",
  "auth/email-already-in-use": "Email already in use",
  "auth/wrong-password": "Incorrect password",
  "auth/invalid-email": "Invalid email",
  "auth/user-disabled": "User disabled",
  "auth/operation-not-allowed": "Operation not allowed",
  "auth/account-exists-with-different-credential":
    "Account exists with different credential",
  "auth/credential-already-in-use": "Credential already in use",
  "auth/timeout": "Timeout",
};

export const getError = (code) => {
  return errorCodes[code] ?? "An error occurred, please try again.";
};

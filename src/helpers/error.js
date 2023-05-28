const errorCodes = {
  "auth/network-request-failed": "Check your internet connection and try again",
  "auth/user-not-found": "Incorrect email or password",
  "auth/weak-password": "Password must be of length 6",
};

export const getError = (code) => {
  return errorCodes[code] ?? "An error occurred, please try again.";
};

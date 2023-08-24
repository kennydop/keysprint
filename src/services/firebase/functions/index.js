/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.createUser = functions.auth.user().onCreate((user) => {
  const { uid, email } = user;

  const userCollection = db.collection("users");

  userCollection.doc(uid).set({
    email: email,
    level: 0,
    checkpoint: 0,
    awpm: 0,
    aacc: 0,
  });
});

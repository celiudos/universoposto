import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initFirebase(): typeof firebase {
  // console.log("FIREBASE_APP", FIREBASE_APP, firebase);

  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
    firebase.firestore();
    // firebase.analytics();
    // console.log("FIREBASE_APP INIT");
  } else {
    // console.log("JA INICIADO FIREBASE_APP");
  }

  return firebase;
}

export default initFirebase;

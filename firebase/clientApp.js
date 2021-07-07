import "firebase/analytics"; // If you need it
import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check that `window` is in scope for the analytics module!
if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
  if ("measurementId" in clientCredentials) firebase.analytics();
}

// Initialize Cloud Firestore through Firebase
firebase.firestore();

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase, rfConfig) // firebase instance as first argument, rfConfig as optional second
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer,
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

export default firebase;

import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/storage";
import { useMemo } from "react";
import { firebaseReducer, getFirebase } from "react-redux-firebase";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
import thunk from "redux-thunk";
import rootReducer from "store/rootReducer";

let store: any;
let middleWare: any;
let rrfProps: any;
let createStoreWithFirebase: any;
let FIREBASE_APP = {};
let FIREBASE_APP_CONFIG = {};

function iniciarFb(initialState: any) {
  const composeEnhancers = composeWithDevTools || compose;

  const fbConfig = {
    prod: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    dev: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_DEV_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_DEV_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_DEV_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_DEV_STORAGE_BUCKET,
      messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_DEV_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_DEV_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_DEV_MEASUREMENT_ID,
    },
  };
  FIREBASE_APP_CONFIG = fbConfig["prod"];

  FIREBASE_APP =
    firebase.apps.length > 0
      ? firebase.apps[0]
      : firebase.initializeApp(FIREBASE_APP_CONFIG);

  console.log("FIREBASE_APP:", FIREBASE_APP);

  if (process.env.NODE_ENV === "production") {
    store = createStore(
      combineReducers({
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        rootReducer,
      }),
      initialState,
      composeEnhancers(applyMiddleware(thunk.withExtraArgument(getFirebase)))
    );
  } else {
    store = createStore(
      combineReducers({
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        rootReducer,
      }),
      initialState,
      composeEnhancers(applyMiddleware(thunk.withExtraArgument(getFirebase)))
    );
  }

  // http://react-redux-firebase.com/docs/api/constants.html#defaultconfig
  const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
    enableClaims: true,
  };

  rrfProps = {
    firebase: FIREBASE_APP,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
  };

  return store;
}

export const initializeStore = (preloadedState: any) => {
  console.log("preloadedState:", preloadedState);

  let _store = store ?? iniciarFb(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = iniciarFb({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return { store, rrfProps };
}

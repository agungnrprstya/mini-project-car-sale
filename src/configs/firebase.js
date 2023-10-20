import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { CONST } from "../utils/constant";

const firebaseConfig = {
  apiKey: CONST.FIREBASE_KEY,
  authDomain: CONST.FIREBASE_AUTH_DOMAIN,
  projectId: CONST.FIREBASE_PROJECT_ID,
  storageBucket: CONST.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: CONST.FIREBASE_MESSAGING_SENDER_ID,
  appId: CONST.FIREBASE_APP_ID,
  measurementId: CONST.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

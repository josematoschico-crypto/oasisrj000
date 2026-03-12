/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const enableAnalytics = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

const firebaseConfig: any = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDcqQnmZk355fbu4mmfJ1CIjYzST3hsYoY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "oasis-rj-bd13f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "oasis-rj-bd13f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "oasis-rj-bd13f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "740021986934",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:740021986934:web:43425f92a66fa14f922157",
};

// Only add measurementId if analytics is enabled to avoid unnecessary Installations API calls
if (enableAnalytics && (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5V8C8048HP")) {
  firebaseConfig.measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5V8C8048HP";
}

// Check if API key is present and looks valid
const isConfigValid = firebaseConfig.apiKey && 
                     firebaseConfig.apiKey !== 'undefined' && 
                     firebaseConfig.apiKey !== '' && 
                     !firebaseConfig.apiKey.startsWith('YOUR_');

let app: any = null;
let db: any = null;
let auth: any = null;
let googleProvider: any = null;
let analytics: any = null;

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore with settings for better stability
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      experimentalAutoDetectLongPolling: false,
      ignoreUndefinedProperties: true,
    });
    
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    
    // Analytics is disabled by default because it frequently triggers the "Installations: Create Installation request failed" 
    // error when API keys have restrictions or the Installations API is not enabled in the Google Cloud Console.
    if (typeof window !== 'undefined' && firebaseConfig.measurementId && enableAnalytics) {
      try {
        analytics = getAnalytics(app);
      } catch (analyticsError) {
        console.warn("Firebase Analytics initialization skipped:", analyticsError);
      }
    }
  } catch (error) {
    console.error("Firebase initialization failed. Check your configuration and API key permissions:", error);
  }
} else {
  console.warn("Firebase configuration is missing or invalid. App will run in demo mode with mock data.");
}

export { db, auth, googleProvider, analytics };

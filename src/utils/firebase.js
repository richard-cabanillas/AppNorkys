import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBFJQ0fjTgoFgerrgIIkjBzy2otAmOTViA",
  authDomain: "restaurante-norky.firebaseapp.com",
  projectId: "restaurante-norky",
  storageBucket: "restaurante-norky.firebasestorage.app",
  messagingSenderId: "250778964247",
    appId: "1:250778964247:web:12f406f4e8feb23642e752",
  databaseURL: "https://restaurante-norky-default-rtdb.firebaseio.com"

  
};

let app, auth, database;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    database = getDatabase(app);
  } else {
    app = getApp();
    auth = getAuth(app);
    database = getDatabase(app);
  }
  console.log("✅ Firebase inicializado");
} catch (error) {
  console.error("❌ Error:", error);
}

export { app as initFirebase, auth, database };
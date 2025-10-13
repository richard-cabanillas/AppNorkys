import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXT50OqoMumUKs-2xTIb-yDwyYRHLVtTQ",
  authDomain: "restaurante-norky.firebaseapp.com",
  projectId: "restaurante-norky",
  storageBucket: "restaurante-norky.firebasestorage.app",
  messagingSenderId: "250778964247",
  appId: "1:250778964247:web:12f406f4e8feb23642e752"
};

export const initFirebase = initializeApp(firebaseConfig);
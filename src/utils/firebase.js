// ❌ NO uses estos imports del SDK web
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// ✅ USA el SDK nativo para React Native
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// El SDK nativo lee la configuración automáticamente desde google-services.json
// NO necesitas el firebaseConfig aquí

let app;
let authInstance;
let databaseInstance;

try {
  console.log("🔄 Inicializando Firebase Nativo...");
  
  // Obtener la instancia de Firebase (ya inicializada automáticamente)
  app = firebase.app();
  
  // Obtener instancias de Auth y Database
  authInstance = auth();
  databaseInstance = database();
  
  console.log("✅ Firebase Nativo inicializado correctamente");
  console.log("✅ App name:", app.name);
  console.log("✅ Auth OK:", !!authInstance);
  console.log("✅ Database OK:", !!databaseInstance);
  
} catch (error) {
  console.error("❌ Error inicializando Firebase Nativo:", error);
}

// Exportar con los mismos nombres que antes para no romper el código existente
export { 
  app as initFirebase, 
  authInstance as auth, 
  databaseInstance as database 
};
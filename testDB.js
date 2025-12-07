import { database } from "./ruta/a/firebase"; 
import { ref, onValue } from "firebase/database";

export const testDB = () => {
  try {
    console.log("📌 [TEST] Database:", database);

    const dbRef = ref(database, "test");

    onValue(
      dbRef,
      (snapshot) => {
        console.log("📌 [TEST] Datos:", snapshot.val());
      },
      (error) => {
        console.log("❌ [TEST] ERROR desde onValue:", error);
      }
    );

  } catch (err) {
    console.log("❌ [TEST] ERROR general:", err);
  }
};
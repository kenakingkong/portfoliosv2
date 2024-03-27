import { initializeApp } from "firebase/app";
import {
  Database,
  DatabaseReference,
  getDatabase,
  ref,
} from "firebase/database";

let db: Database;
let dbRef: DatabaseReference;

const connectDatabase = () => {
  if (db) return db;
  const config = useRuntimeConfig();

  const firebaseConfig = {
    databaseURL: config.FIREBASE_DATABASE_URL,
  };

  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  dbRef = ref(db);
};

export { dbRef, connectDatabase };

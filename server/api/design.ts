import { child, get } from "firebase/database";
import { dbRef } from "../db";

export default defineEventHandler(async () => {
  return await get(child(dbRef, "designItems"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
});

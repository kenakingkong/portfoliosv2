import { DataSnapshot, child, get } from "firebase/database";
import { dbRef } from "../db";

export default defineEventHandler((event) => {
  get(child(dbRef, `designItems`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        return []
      }
    })
    .then((res: DataSnapshot) => {
      console.log(res)
      return {
        data: res
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

import { child, get } from "firebase/database";
import { dbRef } from "../db";
import { ISortable } from "~/models";

const sortDesc = (a: ISortable, b: ISortable) => {
  return b.sort - a.sort;
};

export default defineEventHandler(async () => {
  return await get(child(dbRef, "designItems"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().sort(sortDesc);
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
});

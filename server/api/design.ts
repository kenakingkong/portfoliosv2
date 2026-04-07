import { db } from "../db";
import { ISortable } from "~/models";

const sortDesc = (a: ISortable, b: ISortable) => b.sort - a.sort;

export default defineEventHandler(async () => {
  return await db
    .ref("designItems")
    .once("value")
    .then((snapshot) => {
      return snapshot.exists() ? snapshot.val().sort(sortDesc) : [];
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
});

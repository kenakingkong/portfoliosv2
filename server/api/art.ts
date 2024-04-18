import { child, get } from "firebase/database";
import { dbRef } from "../db";

export default defineEventHandler(async () => {
  const tableNames = ["artItems", "artSocials"];

  const resultList = await Promise.all(
    tableNames.map((tableName: string) =>
      get(child(dbRef, tableName))
        .then((snapshot) => {
          if (snapshot.exists()) {
            return { [tableName]: snapshot.val() };
          } else {
            return { [tableName]: [] };
          }
        })
        .catch((error) => {
          console.error(error);
          return { [tableName]: [] };
        })
    )
  );

  const results = resultList.reduce((acc, val) => {
    acc[Object.keys(val)[0]] = Object.values(val)[0];
    return acc;
  }, {});

  return results;
});

import { db } from "../db";

export default defineEventHandler(async () => {
  const tableNames = ["artItems", "artSocials"];

  const resultList = await Promise.all(
    tableNames.map((tableName: string) =>
      db
        .ref(tableName)
        .once("value")
        .then((snapshot) => {
          return { [tableName]: snapshot.exists() ? snapshot.val() : [] };
        })
        .catch((error) => {
          console.error(error);
          return { [tableName]: [] };
        })
    )
  );

  return resultList.reduce((acc: Record<string, unknown>, val) => {
    acc[Object.keys(val)[0]] = Object.values(val)[0];
    return acc;
  }, {});
});

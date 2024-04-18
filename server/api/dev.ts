import { child, get } from "firebase/database";
import { dbRef } from "../db";
import { ISortable } from "~/models";

const tableNames = [
  "devArticles",
  "devEducation",
  "devExperience",
  "devProjects",
  "devSocials",
  "devSkills",
  "devVolunteer",
];

const sortDesc = (a: ISortable, b: ISortable) => {
  return b.sort - a.sort;
};

export default defineEventHandler(async () => {
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
    acc[Object.keys(val)[0]] = Object.values(val)[0].sort(sortDesc);
    return acc;
  }, {});

  return results;
});

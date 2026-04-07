import { db } from "../db";
import { ISortable } from "~/models";

const tableNames = [
  "devArticles",
  "devCaseStudies",
  "devEducation",
  "devExperience",
  "devProjects",
  "devSocials",
  "devSkills",
  "devVolunteer",
];

const sortDesc = (a: ISortable, b: ISortable) => b.sort - a.sort;

export default defineEventHandler(async () => {
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
    acc[Object.keys(val)[0]] = Object.values(val)[0].sort(sortDesc);
    return acc;
  }, {});
});

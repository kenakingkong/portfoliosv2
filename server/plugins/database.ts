import { connectDatabase } from "../db";

export default defineNitroPlugin(() => {
  connectDatabase();
});

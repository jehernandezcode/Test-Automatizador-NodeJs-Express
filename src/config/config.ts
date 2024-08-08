import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  config({ path: envFile });
}

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;

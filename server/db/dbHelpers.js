import fs from "fs/promises";

async function readDb() {
  const file_data = await fs.readFile("server/db/db.json", "utf-8");

  const db = JSON.parse(file_data); //this is not a asynchronous action so there is no need to use await here

  return db;
}

async function writeDb(db) {
  await fs.writeFile("server/db/db.json", JSON.stringify(db, null, 2));
}

export default {
  readDb,
  writeDb,
};

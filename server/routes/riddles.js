import express from "express";
import dbHelpers from "../db/dbHelpers.js";
// import { writeDb } from "../db/dbHelpers.js";

//we are creating a route object to make this file act as a route
const router = express.Router();

router.get("/", async (req, res) => {
  const all_db = await dbHelpers.readDb();
  res.json(all_db.riddles);
});

router.get("/:id", async (req, res) => {
  const all_db = await dbHelpers.readDb();
  const all_riddles = all_db.riddles;

  const requested_riddle_id = Number(req.params.id);

  const requested_riddle = all_riddles.find(
    (riddle) => riddle.id === requested_riddle_id,
  );

  if (requested_riddle === undefined) {
    res.status(404).json({ error: "Riddle not found" });
    return;
  }

  res.json(requested_riddle);
});

router.post("/", async (req, res) => {
  const all_db = await dbHelpers.readDb();
  const all_riddles = all_db.riddles;

  const all_ids = [];

  //getting all the ids to one array
  all_riddles.forEach((riddle) => {
    all_ids.push(riddle.id);
  });

  //getting the maximum number among all ids
  let max_id = Math.max(...all_ids);

  //if there is no riddles yet in the db, the first riddle will take the id 1
  if (max_id === -Infinity) {
    max_id = 0;
  }

  //creating the object of the new riddle
  const new_riddle = {
    id: max_id + 1,
    name: req.body.name,
    taskDescription: req.body.taskDescription,
    correctAnswer: req.body.correctAnswer,
  };

  //inserting the new riddle to the riddles array and updating the riddles array in the db
  all_riddles.push(new_riddle);

  await dbHelpers.writeDb(all_db);

  res.status(201).json(new_riddle);
});

router.put("/:id", async (req, res) => {
  const all_db = await dbHelpers.readDb();
  const all_riddles = all_db.riddles;

  const requested_updated_riddle_id = Number(req.params.id);

  const requested_riddle = all_riddles.find((riddle) => {
    return riddle.id === requested_updated_riddle_id;
  });

  if (!requested_riddle) {
    res.status(404).json({ error: "Riddle not found" });
    return;
  }

  requested_riddle.name = req.body.name;
  ((requested_riddle.taskDescription = req.body.taskDescription),
    (requested_riddle.correctAnswer = req.body.correctAnswer),
    await dbHelpers.writeDb(all_db));
  res.json(requested_riddle);
});

router.delete("/:id", async (req, res) => {
  const all_db = await dbHelpers.readDb();
  const all_riddles = all_db.riddles;

  const requested_riddle_id = Number(req.params.id);

  //getting the index of the requested ridddle
  const index = all_riddles.findIndex(
    (riddle) => riddle.id === requested_riddle_id,
  );

  //if the index found we delete the requested riddle from the riddles array
  if (index !== -1) {
    all_riddles.splice(index, 1);
  } else {
    res.status(404).json({ error: "Riddle not found" });
    return;
  }

  await dbHelpers.writeDb(all_db);
  res.json({ msg: "Riddle successfully deleted" });
});
export default router;

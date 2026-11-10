import express from "express";
import dbHelpers from "../db/dbHelpers.js";

//we are creating a route object to make this file act as a route
const router = express.Router();

router.get("/", async (req, res) => {
  const all_db = await dbHelpers.readDb();
  const all_players = all_db.players;

  //if there is a name parameter in the rout we return only the players with that name
  if (req.query.name) {
    const players_with_name = all_players.filter((player) => {
      return player.name === req.query.name;
    });

    res.json(players_with_name);
    return;
  }

  //if there is no name parameter we retuen all players
  res.json(all_players);
});

router.post("/", async (req, res) => {
  const all_db = await dbHelpers.readDb();
  const all_players = all_db.players;

  const all_ids = [];

  //getting all the ids to one array
  all_players.forEach((player) => {
    all_ids.push(player.id);
  });

  //getting the maximum number among all ids
  let max_id = Math.max(...all_ids);

  //if there is no riddles yet in the db, the first riddle will take the id 1
  if (max_id === -Infinity) {
    max_id = 0;
  }

  //creating the object of the new riddle
  const new_player = {
    name: req.body.name,
    lowestTime: null,
    id: max_id + 1,
  };

  //inserting the new riddle to the riddles array and updating the riddles array in the db
  all_players.push(new_player);

  await dbHelpers.writeDb(all_db);

  res.status(201).json(new_player);
});

router.put("/:id", async (req, res) => {
  const all_db = await dbHelpers.readDb();
  const all_players = all_db.players;

  const requested_player_id = Number(req.params.id);

  const requested_player = all_players.find(
    (player) => player.id === requested_player_id,
  );

  if (!requested_player) {
    res.status(404).json({ msg: "player does not exists" });
    return;
  }

  if (
    requested_player.lowestTime > req.body.lowestTime ||
    requested_player.lowestTime === null
  ) {
    requested_player.lowestTime = req.body.lowestTime;
  }

  await dbHelpers.writeDb(all_db);

  res.status(200).json({ msg: "player updated successfully" });
});
export default router;

// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.

import PromptSync from "prompt-sync";
import riddles_arr from "./riddles/index.js";
import { Player } from "./classes/Player.js";
import { Riddle } from "./classes/Riddle.js";
const prompt = PromptSync();

console.log("Wellcome to Zohar's riddle game 🙃");
const player_name = prompt("What is your name?");

const player = new Player(player_name);

riddles_arr.forEach((riddle) => {
  const riddle_obj = new Riddle(
    riddle.id,
    riddle.name_,
    riddle.taskDescription,
    riddle.correctAnswer,
  );

  const start_time = Date.now();
  riddle_obj.ask(prompt);
  const end_time = Date.now();
  player.recordTime(start_time, end_time);
});

//showing total time after all riddles
player.showStates();

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
import { MultipleChoiceRiddle } from "./classes/MultipleChoiceRiddle.js";
const prompt = PromptSync();
import fs from "node:fs";

fs.writeFileSync("progress.json", " ");
let progress_arr = [];

console.log("Wellcome to Zohar's riddle game 🙃");
const player_name = prompt("What is your name?");

const player = new Player(player_name);

const level = prompt("Choose difficulty: easy / medium / hard: ");

//a function that change the order in the riddles_arr
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

shuffle(
  riddles_arr.filter((riddle) => {
    return riddle.difficulty === level;
  }),
).forEach((riddle) => {
  const riddle_obj = new MultipleChoiceRiddle(
    riddle.id,
    riddle.name_,
    riddle.taskDescription,
    riddle.correctAnswer,
    riddle.difficulty,
    riddle.timeLimit,
    riddle.hint,
    riddle.choices,
  );

  const start_time = Date.now() / 1000;
  const hint_flag = riddle_obj.ask(prompt);
  const end_time = Date.now() / 1000;
  player.recordTime(start_time, end_time, hint_flag);

  progress_arr.push({
    player_name: `${player.player_name}`,
    id: riddle_obj.id,
    riddle_name: riddle_obj.riddle_name,
    riddle_difficulty: riddle_obj.difficulty,
    time_player_solved: player.showStates(),
  });

  fs.writeFileSync("progress.json", progress_arr);
});

//showing total time after all riddles
console.log(player.showStates());

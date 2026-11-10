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
import chalk from "chalk";
import * as playerApi from "./api/playersApi.js";
import * as riddleApi from "./api/riddlesApi.js";
import PromptSync from "prompt-sync";
// import riddles_arr from "./riddles/index.js";
import { Player } from "./classes/Player.js";
import { Riddle } from "./classes/Riddle.js";
import { MultipleChoiceRiddle } from "./classes/MultipleChoiceRiddle.js";
const prompt = PromptSync();

function recordTime(start, end, hint_flag) {
  if (Date.now() / 1000 - start > 5) {
    console.log("Too slow! 5 seconds penalty applied");
    if (hint_flag === 1) {
      return end - start + 5 + 10;
    } else {
      return end - start + 5;
    }
  }

  if (hint_flag === 1) {
    return end - start + 10;
  } else {
    return end - start;
  }
}

console.log("Wellcome to Zohar's riddle game 🙃");
const player_name = prompt("What is your name?");

let player;
try {
  const is_exists_player = await playerApi.findPlayerByName(player_name);
  if (!is_exists_player) {
    player = await playerApi.createPlayer(player_name);
  } else {
    player = is_exists_player;
  }
} catch (e) {
  console.error(e);
}

console.log(player);

//fetching all riddles
let riddles_arr;
try {
  riddles_arr = await riddleApi.getAllRiddles();
} catch (e) {
  console.error(e);
}

let player_choice = "";

while (player_choice !== "0") {
  console.log(
    "What do you want to do?\n1. Play the game\n2. Create a new riddle\n3. Read all riddles\n4. Update an existing riddle\n5. Delete a riddle\n6. View leaderboard\n0. Exit",
  );
  player_choice = prompt("What is your choice? ");

  switch (player_choice) {
    case "1": //playing the game
      const level = prompt("Choose difficulty: easy / medium / hard: ");

      //a function that change the order in the riddles_arr
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));

          [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
      }

      const selected_riddles = shuffle(
        riddles_arr.filter((riddle) => {
          return riddle.difficulty === level;
        }),
      );

      const start_time = Date.now() / 1000; //staring calculating the time of the game
      let hint_flag;

      for (const riddle of selected_riddles) {
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

        hint_flag = riddle_obj.ask(prompt);
        // const end_time = Date.now() / 1000;
        // const time = player.recordTime(start_time, end_time, hint_flag);
      }

      const end_time = Date.now() / 1000; //the end of the timer of the game

      //calculating the total time of the game
      const time = recordTime(start_time, end_time, hint_flag);

      // let updating_player_time;
      if (player.lowestTime === null || player.lowestTime > time) {
        player.lowestTime = time.toFixed(2);
        let updated = false;
        let attempts = 0;

        while (!updated && attempts < 5) {
          attempts++;

          try {
            const result = await playerApi.updatePlayer(player);

            if (result) {
              updated = true;

              console.log(
                chalk.blue(
                  `Great job, ${player.name}!\nYour time: ${player.lowestTime} seconds\nNew record, time updated after ${attempts} attempts!`,
                ),
              );
            }
          } catch (e) {
            console.log(e);
          }
        }

        if (!updated) {
          console.log("failed to update player after 5 attempts");
        }
      }
      break;
    case "2": //creating new riddle
      const riddle_name = prompt(
        "What is the name of the riddle you want to create? ",
      );

      const user_description = prompt("Write here the riddle: ");
      const riddle_answer = prompt("Write here the answer for the riddle: ");

      try {
        await riddleApi.createRiddle({
          name_: riddle_name,
          taskDescription: user_description,
          correctAnswer: riddle_answer,
        });
      } catch (e) {
        console.log(e);
      }

      break;
    case "3": //show all riddles in the db
      let all_riddles_from_db = [];
      try {
        all_riddles_from_db = await riddleApi.getAllRiddles();
        for (const riddle of all_riddles_from_db) {
          console.log(riddle);
        }
      } catch (e) {
        console.log(e);
      }

      break;
    case "4": //updating a riddle with an id
      const id_riddle = Number(
        prompt("What is the ID of the riddle you want to update? "),
      );
      let updated_name = prompt("What the new riddle name? ");
      let updated_desc = prompt("write the new description: ");
      let updated_answer = prompt("write the updated answer: ");

      let updated = false;
      let attempts = 0;

      while (!updated && attempts < 5) {
        attempts++;

        try {
          await riddleApi.updateRiddle(id_riddle, {
            id: id_riddle,
            name: updated_name,
            taskDescription: updated_desc,
            correctAnswer: updated_answer,
          });
          updated = true;
        } catch (e) {
          console.log(e);
        }
      }

      if (updated) {
        console.log(
          chalk.green(`Riddle updated successfully after ${attempts} attempts`),
        );
      }

      break;
    case "5": //remove a riddle by ID
      const riddle_id = Number(
        prompt("What is the ID of the riddle you want to delete? "),
      );

      try {
        await riddleApi.deleteRiddle(riddle_id);

        console.log(chalk.green("Riddle deleted successfully!"));
      } catch (e) {
        console.log(e);
      }
      break;
    case "6": //display leaderboard
      try {
        const all_players = await playerApi.getAllPlayers();

        let all_done_game_players = all_players.filter((player) => {
          return player.lowestTime !== null;
        });

        all_done_game_players.sort((a, b) => {
          return a.lowestTime - b.lowestTime;
        });

        console.log(chalk.blue("Leaderboard:"));
        all_done_game_players.forEach((player, index) => {
          console.log(
            `${index + 1}. ${player.name} - ${player.lowestTime} seconds`,
          );
        });
      } catch (e) {
        console.log(e);
      }
      break;
    case "0": //exit the game
      console.log(chalk.yellow("Goodbye..."));
      break;
  }
}

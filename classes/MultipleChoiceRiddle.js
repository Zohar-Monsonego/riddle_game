import { Riddle } from "./Riddle.js";

export class MultipleChoiceRiddle extends Riddle {
  constructor(
    id_,
    name_,
    taskDescription_,
    correctAnswer_,
    difficulty_,
    timeLimit_,
    hint_,
    choices_list_,
  ) {
    super(
      id_,
      name_,
      taskDescription_,
      correctAnswer_,
      difficulty_,
      timeLimit_,
      hint_,
    );
    this.choices = choices_list_;
  }

  ask(prompt) {
    let hint_flag = 0;
    console.log(this.taskDescription);
    this.choices.forEach((choice) => {
      console.log(choice);
    });
    let user_answer = prompt("Your answer: ");
    if (user_answer != "hint") {
      user_answer = Number(user_answer);
    }
    while (this.correctAnswer != user_answer) {
      if (user_answer === "hint") {
        console.log(this.hint);
        hint_flag = 1;
        console.log("Hint add 10 seconds to your score");
        user_answer = prompt("Try again: ");
      } else {
        user_answer = prompt("Oops 🥲, try again: ");
      }
    }
    console.log("Yayy, CORRECT! 😍");
    return hint_flag;
  }
}

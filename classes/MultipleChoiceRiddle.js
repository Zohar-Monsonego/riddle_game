import { Riddle } from "./Riddle.js";

export class MultipleChoiceRiddle extends Riddle {
  constructor(id_, name_, taskDescription_, correctAnswer_, choices_list_) {
    super(id_, name_, taskDescription_, correctAnswer_);
    this.choices = choices_list_;
  }

  ask(prompt) {
    console.log(this.taskDescription);
    this.choices.forEach((choice) => {
      console.log(choice);
    });
    let user_answer = Number(prompt("Your answer: "));
    while (this.correctAnswer != user_answer) {
      user_answer = prompt("Oops 🥲, try again: ");
    }
    console.log("Yayy, CORRECT! 😍");
  }
}

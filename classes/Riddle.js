// The Riddle class. Export it as the default export.
//
// Properties (received in the constructor):
// - id
// - name
// - taskDescription
// - correctAnswer
//
// Method:
// - ask(prompt)
//   - show the riddle (name and taskDescription) to the player
//   - ask the player for an answer using the `prompt` function that is passed in
//   - keep asking until the answer is correct

export class Riddle {
  constructor(id_, name_, taskDescription_, correctAnswer_) {
    this.id = id_;
    this.riddle_name = name_;
    this.taskDescription = taskDescription_;
    this.correctAnswer = correctAnswer_;
  }

  ask(prompt) {
    console.log(this.taskDescription);
    let user_answer = prompt("Your answer: ");
    while (this.correctAnswer != user_answer) {
      user_answer = prompt("Oops 🥲, try again: ");
    }
    console.log("Yayy, CORRECT! 😍");
  }
}

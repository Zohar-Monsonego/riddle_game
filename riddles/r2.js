// Riddle number 2.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)

export default {
  id: 2,
  name_: "The riddle",
  taskDescription: "I have hands but cannot clap. What am I?",
  choices: ["1. Wall", "2. Brash", "3. Clock", "4. Dog"],
  correctAnswer: 3,
  difficulty: "medium",
  timeLimit: 10,
  hint: "I help you know when it's time to do something",
};

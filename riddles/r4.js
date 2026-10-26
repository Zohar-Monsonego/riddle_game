// Riddle number 4.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)

export default {
  id: 4,
  name_: "The challenge",
  taskDescription: "What has many keys but cannot open a single door?",
  choices: ["1. House keeper", "2. Car", "3. Bottle", "4. Piano"],
  correctAnswer: 4,
  difficulty: "medium",
  timeLimit: 10,
  hint: "My keys make different sounds when you press them",
};

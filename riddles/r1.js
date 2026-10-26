// Riddle number 1.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)

export default {
  id: 1,
  name_: "The animal",
  taskDescription:
    "I have a long neck and eat leaves from tall trees. What am I?",
  choices: ["1. Lion", "2. Giraffe", "3. Bird", "4. Dog"],
  correctAnswer: 2,
  difficulty: "easy",
  timeLimit: 8,
  hint: "I am the tallest land animal in the world",
};

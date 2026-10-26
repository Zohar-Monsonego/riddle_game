// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle

class Player {
  constructor(_name) {
    this.player_name = _name;
    this.times = [];
  }

  recordTime(start, end) {
    this.times.push(end - start);
  }

  showStates() {
    let total_time = 0;
    this.times.forEach((time) => (total_time += time));
    const average = total_time / this.times.length;
    console.log(`Total time: ${total_time}\nAvergae time: ${average}`);
  }
}

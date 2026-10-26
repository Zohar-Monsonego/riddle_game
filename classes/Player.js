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

export class Player {
  constructor(_name) {
    this.player_name = _name;
    this.times = [];
  }

  recordTime(start, end, hint_flag) {
    if (Date.now() / 1000 - start > 5) {
      console.log("Too slow! 5 seconds penalty applied");
      if (hint_flag === 1) {
        this.times.push(end - start + 5 + 10);
      } else {
        this.times.push(end - start + 5);
      }
    }

    if (hint_flag === 1) {
      this.times.push(end - start + 10);
    } else {
      this.times.push(end - start);
    }
  }

  showStates() {
    let total_time = 0;
    this.times.forEach((time) => (total_time += time));
    const average = total_time / this.times.length;
    return `Total time: ${total_time} s\nAvergae time: ${average} s`;
  }
}

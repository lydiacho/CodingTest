// greedy
const fs = require("fs");
const [N, input] = fs.readFileSync(0).toString().trim().split("\n");
const n = +N;
const times = input.split(" ").map(Number);

const solution = () => {
  times.sort((a, b) => a - b);
  return times.reduce((acc, curr, currIdx) => {
    return acc + curr * (n - currIdx);
  }, 0);
};
console.log(solution());

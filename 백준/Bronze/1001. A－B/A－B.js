const fs = require("fs");
const [A, B] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const solution = () => {
  return A - B;
};

console.log(solution());
const fs = require("fs");
const list = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const solution = () => {
  const answer = [];

  for (let i = 0; i < list.length - 1; i++) {
    const curr = list[i];
    curr.sort((a, b) => b - a);
    if (curr[0] === curr[1] && curr[0] === curr[2]) {
      answer.push("Equilateral");
      continue;
    }
    if (curr[0] >= curr[1] + curr[2]) {
      answer.push("Invalid");
      continue;
    }
    if (curr[2] === curr[1] || curr[0] === curr[1]) {
      answer.push("Isosceles");
      continue;
    }
    answer.push("Scalene");
  }
  return answer.join("\n");
};

console.log(solution());

const fs = require("fs");
const [input1, ...arr] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const N = +input1;

const solution = () => {
  const char = {};
  arr.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      if (!char[word[i]]) char[word[i]] = 0;
      char[word[i]] += Math.pow(10, word.length - 1 - i);
    }
  });
  let num = 9;
  const sum = Object.values(char)
    .sort((a, b) => b - a)
    .reduce((acc, curr) => {
      return acc + curr * num--;
    }, 0);

  return sum;
};

console.log(solution());

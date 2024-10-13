// N개의 자연수를 M개의 수열에 어떻게 배치할지?

const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [n, m] = input1.split(" ").map(Number);
const arr = input2.split(" ").map(Number);

const solution = () => {
  const answer = [];
  const set = new Set();
  arr.sort((a, b) => a - b);

  const cal = (num) => {
    set.add(num);

    if (set.size === m) {
      answer.push(Array.from(set).join(" "));
      set.delete(num);
      return;
    }
    arr.map((v) => {
      if (set.has(v)) return;
      cal(v);
      set.delete(v);
    });
  };

  arr.map((v) => {
    cal(v);
    set.delete(v);
  });
  return answer.join("\n");
};

console.log(solution());

// output : 듣보잡 수, 명단 사전순 나열
const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [a, b] = input1.split(" ").map(Number);
const arrA = rest.splice(0, a);
const arrB = rest;

const solution = () => {
  const setA = new Set(arrA);
  let count = 0;
  const answer = [];

  arrB.map((v) => {
    if (setA.has(v)) {
      count++;
      answer.push(v);
    }
  });
  answer.sort();
  return [count, ...answer].join("\n");
};
console.log(solution());

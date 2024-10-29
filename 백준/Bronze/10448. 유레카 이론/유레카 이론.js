const fs = require("fs");
const [T, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
const t = +T;
const arr = rest.map(Number);

const solution = () => {
  const answer = [];
  const triNum = [];
  // K가 1000이하이므로 Tn도 1000미만. n은 44이하
  for (let i = 1; i <= 44; i++) {
    triNum.push((i * (i + 1)) / 2);
  }

  const find = (target) => {
    for (let u = 0; u < 44; u++) {
      for (let v = u; v < 44; v++) {
        for (let w = v; w < 44; w++) {
          if (triNum[u] + triNum[v] + triNum[w] === target) return 1;
        }
      }
    }
    return 0;
  };

  for (let i = 0; i < t; i++) {
    answer.push(find(arr[i]));
  }

  return answer.join("\n");
};

console.log(solution());

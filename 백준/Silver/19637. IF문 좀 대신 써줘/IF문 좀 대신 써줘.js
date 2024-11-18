const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M] = input1.split(" ").map(Number);
const names = rest.splice(0, N).map((v) => v.split(" "));
const powers = rest.map(Number);

// 이진탐색?
// 각 power에 대해 이분탐색

const solution = () => {
  let answer = [];
  for (let i = 0; i < M; i++) {
    const power = powers[i];
    let l = 0;
    let r = N;
    let m = Math.floor((l + r) / 2);
    let temp = "";
    while (l <= r) {
      const [name, maxp] = names[m];
      if (+maxp >= power) {
        r = m - 1;
        temp = name;
      } else if (+maxp < power) {
        l = m + 1;
      }
      m = Math.floor((l + r) / 2);
    }
    answer.push(temp);
  }
  return answer.join("\n");
};

console.log(solution());

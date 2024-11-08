const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const T = +input1;
const arr = input2.map((v) => v.split(" ").map(Number));
const MAX = 10000;

const solution = () => {
  const answer = [];

  arr.forEach(([A, B]) => {
    const q = [[A, ""]];
    let head = 0;
    const visited = { [A]: true };

    while (q.length > head) {
      const [curr, inst] = q[head++];

      if (curr === B) {
        answer.push(inst);
        return;
      }

      const newD = (curr * 2) % MAX;
      if (!visited[newD]) {
        q.push([newD, inst + "D"]);
        visited[newD] = true;
      }
      const newS = (curr - 1 + MAX) % MAX;
      if (!visited[newS]) {
        q.push([newS, inst + "S"]);
        visited[newS] = true;
      }
      const newL = (curr % 1000) * 10 + Math.floor(curr / 1000);
      if (!visited[newL]) {
        q.push([newL, inst + "L"]);
        visited[newL] = true;
      }
      const newR = Math.floor(curr / 10) + (curr % 10) * 1000;
      if (!visited[newR]) {
        q.push([newR, inst + "R"]);
        visited[newR] = true;
      }
    }
  });

  return answer.join("\n");
};

console.log(solution());

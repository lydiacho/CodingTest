// 이웃한 집과 색이 같으면 안됨
// 최소한의 비용을 사용해야 함
// 🧨 : 이차원 배열 메모리 관리 방식을 기억하자!

const fs = require("fs");
const [N, ...rest] = fs.readFileSync(0).toString().trim().split("\n");

const n = +N;
const costs = rest.map((v) => v.split(" ").map(Number));
const mem = Array.from({ length: n }, (_, i) => [...costs[i]]);

const solution = () => {
  for (let i = 1; i < n; i++) {
    for (let c = 0; c < 3; c++) {
      mem[i][c] =
        Math.min(mem[i - 1][(c - 1 + 3) % 3], mem[i - 1][(c - 2 + 3) % 3]) +
        costs[i][c];
    }
  }

  return Math.min(...mem[n - 1]);
};

console.log(solution());

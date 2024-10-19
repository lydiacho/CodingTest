// - n이 최대 100이므로 3중for문(플로이드)괜찮
// - 플로이드로 해서 각 정점간의 경로 유무 구하기
const fs = require("fs");
const [N, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
const n = +N;
const grid = rest.map((v) => v.split(" ").map(Number));

const solution = () => {
  // 플로이드 와샬
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1) continue;
        grid[i][j] = grid[i][k] && grid[k][j] ? 1 : 0;
      }
    }
  }

  return grid.map((v) => v.join(" ")).join("\n");
};

console.log(solution());

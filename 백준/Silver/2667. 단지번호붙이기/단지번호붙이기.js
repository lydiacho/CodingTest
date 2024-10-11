const fs = require("fs");
const [input, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const N = +input;
const 지도방문 = rest.map((v) =>
  v.split("").map((v) => (v === "1" ? false : true))
); // 바로 방문배열로 변환
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const dfs = (x, y) => {
  let count = 1;
  지도방문[x][y] = true;
  dir.map(([dx, dy]) => {
    const [newx, newy] = [dx + x, dy + y];
    if (newx < 0 || newx >= N || newy < 0 || newy >= N) return;
    if (지도방문[newx][newy]) return;
    count += dfs(newx, newy);
  });
  return count;
};

const solution = () => {
  let 단지수 = 0;
  const 단지크기 = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (지도방문[i][j]) continue;
      단지크기.push(dfs(i, j));
      단지수++;
    }
  }
  단지크기.sort((a, b) => a - b);
  return [단지수, ...단지크기];
};

console.log(solution().join("\n"));

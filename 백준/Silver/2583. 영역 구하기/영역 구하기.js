// - 눈금 MxN 모눈종이 위에 K개의 직사각형 그리기, 직사각형 외부의 분리된 영역
// - input : M, N, K개의 직사각형 좌표(왼쪽아래, 오른쪽위)
// - output : 직사각형 외부의 분리된 영역 개수, 각 영역의 넓이
// ⇒ 직사각형에 포함된 영역을 방문 표시 후 빈곳을 DFS, 컴포넌트 개수와 크기

const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [m, n, k] = input1.split(" ").map(Number);
const sqaures = rest.map((v) => v.split(" ").map(Number));

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const visited = Array.from({ length: n + 1 }, () =>
  Array.from({ length: m + 1 }, () => false)
);

const dfs = (x, y) => {
  let size = 1;
  visited[x][y] = true;

  dir.map(([dx, dy]) => {
    const newx = x + dx;
    const newy = y + dy;
    if (newx < 1 || newx > n || newy < 1 || newy > m) return;
    if (visited[newx][newy]) return;
    size += dfs(newx, newy);
  });

  return size;
};

const solution = () => {
  // 직사각형에 포함되는 곳 방문 표시
  sqaures.map(([x1, y1, x2, y2]) => {
    for (let i = x1 + 1; i <= x2; i++) {
      for (let j = y1 + 1; j <= y2; j++) {
        if (visited[i][j]) continue;
        visited[i][j] = true;
      }
    }
  });

  let count = 0;
  const sizes = [];

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (visited[i][j]) continue;
      sizes.push(dfs(i, j));
      count++;
    }
  }

  return [count, sizes.sort((a, b) => a - b).join(" ")].join("\n");
};

console.log(solution());

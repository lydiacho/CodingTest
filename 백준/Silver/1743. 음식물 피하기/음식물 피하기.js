// - 음식물 흘린 곳 중 → 인접한 음식물 뭉치가 가장 큰 곳 구하기
// - input : 세로N, 가로M, 음식물쓰레기수 K, 음식물 좌표 (r,c) (1~)

// ⇒ 가장 큰 컴포넌트의 크기를 구하면 됨

const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [행, 열, 음쓰수] = input1.split(" ").map(Number);
const 음식물위치 = rest.map((v) => v.split(" ").map((v) => +v - 1)); // index 0부터로 조정

// 방문배열, 방향배열 초기화
const visited = Array.from({ length: 행 }, () =>
  Array.from({ length: 열 }, () => true)
);
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const dfs = (x, y) => {
  let count = 1;
  visited[x][y] = true;

  dir.map(([dx, dy]) => {
    const newx = x + dx;
    const newy = y + dy;
    if (newx < 0 || newx >= 행 || newy < 0 || newy >= 열) return;
    if (visited[newx][newy]) return;
    count += dfs(newx, newy);
  });

  return count;
};

const solution = () => {
  // 음식물위치로 방문배열 업데이트
  음식물위치.map(([x, y]) => {
    visited[x][y] = false;
  });

  // 모든 정점 돌면서 dfs 시작 & 컴포넌트 크기 아카이빙
  let sizeOfTrash = -1;
  for (let i = 0; i < 행; i++) {
    for (let j = 0; j < 열; j++) {
      if (visited[i][j]) continue; // 🧨잊지말기!
      sizeOfTrash = Math.max(sizeOfTrash, dfs(i, j));
    }
  }

  return sizeOfTrash;
};
console.log(solution());

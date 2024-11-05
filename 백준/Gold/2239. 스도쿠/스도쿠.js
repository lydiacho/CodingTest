// 채워지지 않은 스도쿠를 모두 채우는 미션
// 0인 칸에 스도쿠 규칙에 맞게 알맞은 숫자를 넣으면 됨
const fs = require("fs");
const blanks = [];
const grid = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((v, x) =>
    v.split("").map((w, y) => {
      if (+w === 0) {
        blanks.push([x, y]);
      }
      return +w;
    })
  );

const checkNum = (x, y, visited) => {
  // 같은 행 방문 표시
  grid[x].forEach((v) => {
    visited[v] = true;
  });
  // 같은 열 방문 표시
  for (let i = 0; i < 9; i++) {
    visited[grid[i][y]] = true;
  }
  // 같은 그룹 방문 표시
  let groupX = Math.floor(x / 3);
  let groupY = Math.floor(y / 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      visited[grid[i + groupX * 3][j + groupY * 3]] = true;
    }
  }
};

const printGrid = () => {
  console.log(grid.map((v) => v.join("")).join("\n"));
};

const dfs = (idx) => {
  if (idx === blanks.length) {
    printGrid();
    process.exit(0);
  }
  const visited = Array.from({ length: 10 }, () => false); // 🧨

  const [x, y] = blanks[idx];

  // 불가능한 숫자를 모두 표시하기
  checkNum(x, y, visited);
  // 가능한 모든 수에 대해 시도해보기
  for (let i = 1; i <= 9; i++) {
    if (visited[i]) continue;
    grid[x][y] = i;
    dfs(idx + 1);
    grid[x][y] = 0;
  }
};

const solution = () => {
  // 각 빈칸을 순회하면서 가능한 수를 채워넣고 다음 재귀를 호출한다
  // 가능한 경우가 없을 땐 돌아와서 다른 수를 시도하도록 한다.
  dfs(0);
};

console.log(solution());

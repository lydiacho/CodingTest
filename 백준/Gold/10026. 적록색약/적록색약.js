// - NxN 그리드 각 칸에 R, G, B 칠해짐. 같은 색상의 컴포넌트가 같은 구역임.
// - 적록색약은 R, G를 잘 구분하지 못해서, 이 둘도 같은 색으로 여김
// - 적록색약일 때의 구역 수, 아닐 때의 구역수

// ⇒ R, G를 다른 색으로 여길 때의 컴포넌트 수, 같은 색으로 여길 때의 컴포넌트 수

const fs = require("fs");
const [N, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
const n = +N;
let grid = rest.map((v) => v.split(""));

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let visited = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => false)
);
const dfs = (x, y) => {
  const curr = grid[x][y];
  visited[x][y] = true;

  dir.map(([dx, dy]) => {
    const newx = x + dx;
    const newy = y + dy;
    if (newx < 0 || newx >= n || newy < 0 || newy >= n) return;
    if (visited[newx][newy]) return;
    if (grid[newx][newy] !== curr) return; // 색이 같은 칸만 탐색
    dfs(newx, newy);
  });
};

const solution = () => {
  let count = 0;
  let answer = "";

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) continue;
      dfs(i, j);
      count++;
    }
  }
  answer += count;

  visited = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );
  count = 0;
  // 적록색맹이면 R, G 색 동일시
  grid = grid.map((v) =>
    v.map((w) => (w === "B" ? "B" : w === "R" ? "R" : "R"))
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) continue;
      dfs(i, j);
      count++;
    }
  }
  answer += " " + count;
  return answer;
};

console.log(solution());

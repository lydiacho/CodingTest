const fs = require('fs');
const grid = fs.readFileSync(0).toString().trim().split('\n').map((v) => v.split(' ').map(Number));
const pos = [];

const printGrid = (grid) => {
  return grid.map(v => v.join(' ')).join('\n');
}

const dfs = (idx) => {
  if (idx === pos.length) {
    // 깊은 복사 
    console.log(printGrid(grid));
    process.exit(0);
  }
  const visited = Array.from({ length: 10 }, () => false);
  const [x, y] = pos[idx];
  // 현재 빈칸 위치에 올 수 없는 숫자 쳐내기 
  // 같은 행 체크
  grid[x].map(v => {
    visited[v] = true;
  });
  // 같은 열 체크 
  for (let j = 0; j < 9; j++) {
    visited[grid[j][y]] = true; // 어차피 visited[0]은 신경 안씀 
  }

  // 같은 그룹 체크 
  let groupX = Math.floor(x / 3);
  let groupY = Math.floor(y / 3);
  for (let v = 0; v < 3; v++) {
    for (let w = 0; w < 3; w++) {
      visited[grid[groupX * 3 + v][groupY * 3 + w]] = true;
    }
  }
  // 가능한 수 필터링하기
  const filtered = [];
  visited.map((v, i) => {
    if (i > 0 && !v) {
      filtered.push(i);
    }
  });

  for (let i = 1; i < 10; i++) {
    if (visited[i]) continue;
    grid[x][y] = i;
    dfs(idx + 1);
    grid[x][y] = 0;
  }
}

const solution = () => {
  // 빈칸 위치 Pos 배열 채우기 
  grid.map((v, x) => v.map((w, y) => {
    if (w === 0) {
      pos.push([x, y]);
    }
  }));

  // 각 빈칸을 돌면서 dfs 
  dfs(0);
}

solution();
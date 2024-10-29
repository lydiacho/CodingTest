const fs = require("fs");
const [N, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
const grid = rest.map((v) => v.split(" ").map(Number));

const solution = () => {
  const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let leftHeight;

  let max = 1; // 아무 마을도 안잠겼을 땐 영역 1개
  const dfs = (x, y) => {
    leftHeight[x][y] = 0;

    dir.map(([dx, dy]) => {
      const newx = x + dx;
      const newy = y + dy;
      if (newx < 0 || newx >= +N || newy < 0 || newy >= +N) return;
      if (leftHeight[newx][newy]<=0) return;
      dfs(newx, newy);
    });
  }

  const maxHeight = Math.max(...grid.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, []));


  for (let i = 1; i <= maxHeight; i++) {
    leftHeight = grid.map(row => row.map(v => v - i)); // 잠기지 않은 높이만 남기기 

    let count = 0;
    for (let i = 0; i < +N; i++) {
      for (let j = 0; j < +N; j++) {
        if (leftHeight[i][j]<=0) continue; // 0이면 잠기거나 visited
        dfs(i, j);
        count++;
      }
    }
    max = Math.max(max, count);
  }
  
  return max;
};

console.log(solution());

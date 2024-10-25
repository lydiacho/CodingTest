const fs = require('fs');
let [in1, ...in2] = fs.readFileSync(0).toString().trim().split('\n');
const [R, C, K] = in1.split(' ').map(Number);
const visited = in2.map(v => v.split('').map(w => {
  if (w === '.') return false;
  if (w === 'T') return true;
}));
const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
let answer = 0;
const dfs = (x, y, dist) => {
  // 종료 조건 
  if (dist === K) {
    if (x === 0 && y === C - 1) {
      answer++;
    }
    return;
  }

  visited[x][y] = true;

  dir.map(([dx, dy]) => {
    const [newx, newy] = [x + dx, y + dy];
    if (newx < 0 || newx >= R || newy < 0 || newy >= C) return;
    if (visited[newx][newy]) return;
    dfs(newx, newy, dist + 1);
  });
  visited[x][y] = false; //여기! 백트래킹! 
}

const solution = () => {

  dfs(R-1, 0, 1);

  return answer;
}
console.log(solution());
// 미로에서 인접한 칸만 이동해서 (1,1)에서 (N,M)으로 이동하는 최소 칸 수
// input : n, m, nxm짜리 미로
// output : 지나야 하는 최소 칸 수

// bfs로 최단경로 구하기

const fs = require("fs");
const [nm, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
const [n, m] = nm.split(" ").map((v) => +v);
const grid = rest.map((v) => v.split("").map((w) => +w));

const solution = (grid) => {
  // 큐, 방문배열 생성
  const q = [];
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => false)
  );

  // bfs 시작
  // 첫 노드 방문
  q.push([0, 0]);
  visited[0][0] = true;

  let level = 1; // 출발위치도 포함
  while (q.length > 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const [x, y] = q.shift();
      // 정답 만나면 종료
      if (x === n - 1 && y === m - 1) {
        return level;
      }

      const dir = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ];
      dir.forEach(([dx, dy]) => {
        if (x + dx < 0 || x + dx >= n || y + dy < 0 || y + dy >= m) {
          return;
        }
        if (!visited[x + dx][y + dy] && grid[x + dx][y + dy] === 1) {
          //인접 노드 큐에 기록
          q.push([x + dx, y + dy]);
          visited[x + dx][y + dy] = true;
        }
      });
    }
    level++;
  }
  return level;
};

console.log(solution(grid));
// 격차판에 배추가 곳곳에 심어져 있음. 지렁이는 인접한 배추만 지나감.
// 지렁이가 모든 배추를 지나가야함.필요한 최소한의 지렁이 개수는?
// input : 테케 개수 T, 배추밭의 MxN, 배추 개수 K, 배추 위치 좌표 (x,y)
// output : 테케별 지렁이 최소 수

// (0,0)부터 DFS 재귀호출 -> 인접한 네 칸 중 방문하지 않은 곳으로 이동.

const fs = require("fs");
const [T, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
let t = +T;
while (t--) {
  let count = 0;
  // 필요한 요소 추출하면서 rest 원본 자르기
  const [m, n, k] = rest
    .splice(0, 1)[0]
    .split(" ")
    .map((w) => +w);

  // grid 초기화 후 채우기
  const grid = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => 0)
  );

  rest
    .splice(0, k)
    .map((v) => v.split(" ").map((w) => +w))
    .map(([x, y]) => {
      grid[x][y] = 1;
    });

  // visited 배열 초기화
  const visited = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => false)
  );

  // DFS 함수
  const dfs = (x, y) => {
    //1. 방문 체크
    visited[x][y] = true;

    //2. 인접한 노드 중 이동 가능한 곳으로 재귀 호출
    const dir = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];

    dir.forEach(([dx, dy]) => {
      if (
        x + dx >= 0 &&
        x + dx < m &&
        y + dy >= 0 &&
        y + dy < n &&
        grid[x + dx][y + dy] === 1 &&
        !visited[x + dx][y + dy]
      ) {
        dfs(x + dx, y + dy);
      }
    });
  };

  // 모든 노드에 대해 DFS 재귀호출하여 컴포넌트 수 구하기
  const solution = () => {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1 && !visited[i][j]) {
          count++;
          dfs(i, j);
        }
      }
    }

    return count;
  };

  console.log(solution());
}
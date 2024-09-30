// 나이트의 1회 이동 : (+-2, +-1), (+-1, +-2)
// input : 체스판 한 변 길이 l(4~300), 나이트 현재 좌표, 나이트 목표 좌표
// outpu : 나이트 최소 몇 번 이동

// bfs로 최단경로 구하기

const fs = require("fs");
const [T, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
let t = +T;

while (t--) {
  const l = rest.splice(0, 1); // 체스판 한 변 길이
  const [nowx, nowy] = rest
    .splice(0, 1)[0]
    .split(" ")
    .map((v) => +v);
  const [destx, desty] = rest
    .splice(0, 1)[0]
    .split(" ")
    .map((v) => +v);

  const solution = () => {
    // bfs 시작
    // 큐, 방문배열 생성
    const q = [];
    const visited = Array.from({ length: l }, () =>
      Array.from({ length: l }, () => false)
    );

    let level = 0;
    const dir = [
      [2, 1],
      [-2, 1],
      [2, -1],
      [-2, -1],
      [1, 2],
      [-1, 2],
      [1, -2],
      [-1, -2],
    ];

    // 시작 노드 추가
    q.push([nowx, nowy]);
    visited[nowx][nowy] = true;

    while (q.length > 0) {
      const size = q.length;
      for (let i = 0; i < size; i++) {
        const [x, y] = q.shift();

        // 종료조건
        if (x === destx && y === desty) {
          return level;
        }

        dir.forEach(([dx, dy]) => {
          if (x + dx < 0 || x + dx >= l || y + dy < 0 || y + dy >= l) return;
          if (!visited[x + dx][y + dy]) {
            q.push([x + dx, y + dy]);
            visited[x + dx][y + dy] = true;
          }
        });
      }
      level++;
    }
  };

  console.log(solution());
}

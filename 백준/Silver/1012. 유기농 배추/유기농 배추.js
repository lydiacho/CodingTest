// - 지렁이는 인접한 배추를 이동함. (상하좌우)
// - 군데군데 심어져있는 모든 배추를 보호하려면 지렁이는 최소 몇마리?
// - input : 테스트케이스 T, 배추밭 MxN, 배추개수K, 배추위치(X,Y)
// ⇒ 컴포넌트 개수 구하는 것과 동일한 유형

const fs = require("fs");
const [input, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
let t = +input;

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const answer = [];
while (t--) {
  const [행, 열, 배추수] = rest.splice(0, 1)[0].split(" ").map(Number);
  const 배추위치 = rest.splice(0, 배추수).map((v) => v.split(" ").map(Number));

  // 방문배열 초기화
  // 🧨 좌표 문제의 경우, 인접리스트를 관리할 필요 없음 (상하좌우인걸 아니까!)
  const visited = Array.from({ length: 행 }, () =>
    Array.from({ length: 열 }, () => true)
  );

  const dfs = (x, y) => {
    visited[x][y] = true;
    dir.map(([dx, dy]) => {
      const [newx, newy] = [x + dx, y + dy];
      if (newx < 0 || newx >= 행 || newy < 0 || newy >= 열) return;
      if (visited[newx][newy]) return;
      dfs(newx, newy);
    });
  };

  const solution = () => {
    // visited 배열에 배추 있는 곳만 false로 뚫기
    배추위치.map(([x, y]) => {
      visited[x][y] = false;
    });

    let countBugs = 0;
    for (let i = 0; i < 행; i++) {
      for (let j = 0; j < 열; j++) {
        if (visited[i][j]) continue; // 🧨for문에서 return 쓰지 말기 주의! map과 혼동 X.
        dfs(i, j);
        countBugs++;
      }
    }
    answer.push(countBugs);
  };
  solution();
}
console.log(answer.join("\n"));

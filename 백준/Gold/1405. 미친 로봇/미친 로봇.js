// - 로봇이 동서남북으로 한 칸씩 N번 이동한다
// - 방문한 곳을 다시 방문하지 않는 경로 : 단순
// - 중복해서 방문하는 경로 : 단순하지 않음
// - input: 이동 횟수 (N ≤ 14), 동서남북으로 이동할 확률 (도합 100)
// - sol : 단순할 확률을 출력하려면 모든 단순한 경로를 구하고, 이때 이동 확률을 곱해서 총합하면 됨

const fs = require("fs");
const [N, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const 확률 = rest.map((v) => v / 100);

const solution = () => {
  // -N ~ N -> 0~2N
  const visited = Array.from({ length: 2 * N + 1 }, () =>
    Array.from({ length: 2 * N + 1 }, () => false)
  );
  const dir = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  let answer = 0;

  const dfs = (x, y, count, probability) => {
    visited[x][y] = true;

    if (count === N) {
      answer += probability;

      visited[x][y] = false;
      return;
    }

    dir.forEach(([dx, dy], idx) => {
      const [newx, newy] = [x + dx, y + dy];

      if (visited[newx][newy]) return;
      if (확률[idx] === 0) return; // 확률이 0인 방향으로는 가지 않음
      dfs(newx, newy, count + 1, probability * 확률[idx]);
    });

    visited[x][y] = false;
  };

  visited[N][N] = true;
  dir.forEach(([dx, dy], idx) => {
    if (확률[idx] === 0) return;
    dfs(N + dx, N + dy, 1, 확률[idx]);
  });

  return answer;
};

console.log(solution());

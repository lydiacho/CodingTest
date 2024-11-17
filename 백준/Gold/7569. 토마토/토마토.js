const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [M, N, H] = input1.split(" ").map(Number);
const grid = rest.map((v) => v.split(" ").map(Number));

const solution = () => {
  const q = [];
  let head = 0;
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: N }, () => Array.from({ length: M }, () => false))
  );

  for (let i = 0; i < H; i++) {
    const temp = grid.splice(0, N);
    temp.forEach((v, n) => {
      v.forEach((w, m) => {
        if (w === -1) {
          visited[i][n][m] = true;
          return;
        }
        if (w === 1) {
          q.push([i, n, m]);
          visited[i][n][m] = true;
          return;
        }
        visited[i][n][m] = false;
      });
    });
  }

  const dir = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  let count = -1;
  while (q.length > head) {
    let size = q.length - head;
    for (let i = 0; i < size; i++) {
      const [h, n, m] = q[head++];

      dir.forEach(([dh, dn, dm]) => {
        const [newh, newn, newm] = [h + dh, n + dn, m + dm];
        if (
          newh < 0 ||
          newh >= H ||
          newn < 0 ||
          newn >= N ||
          newm < 0 ||
          newm >= M
        )
          return;
        if (visited[newh][newn][newm]) return;
        q.push([newh, newn, newm]);
        visited[newh][newn][newm] = true;
      });
    }
    count++;
  }
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (!visited[i][j][k]) return -1;
      }
    }
  }
  return count;
};

console.log(solution());

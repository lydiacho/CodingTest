const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [M, N] = input1.split(" ").map(Number);
const box = input2.map((v) => v.split(" ").map(Number));

const solution = () => {
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const q = [];
  let head = 0;

  box.map((v, x) =>
    v.map((w, y) => {
      if (w === 1) {
        q.push([x, y]);
      }
    })
  );

  let count = -1;
  while (q.length > head) {
    let size = q.length - head;
    for (let i = 0; i < size; i++) {
      const [x, y] = q[head++];

      dir.forEach(([dx, dy]) => {
        const [nx, ny] = [x + dx, y + dy];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) return;

        if (box[nx][ny] !== 0) return;
        q.push([nx, ny]);
        box[nx][ny] = 1;
      });
    }
    count++;
  }

  // 더이상 전파할 수 없는 상황
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (box[i][j] === 0) {
        return -1;
      }
    }
  }
  return count;
};

console.log(solution());

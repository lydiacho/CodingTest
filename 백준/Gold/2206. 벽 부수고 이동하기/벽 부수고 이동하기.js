const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M] = input1.split(" ").map(Number);
const grid = input2.map((v) => v.split("").map(Number));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array.from({ length: 2 }, () => false))
);
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const solution = () => {
  const q = [];
  let head = 0;

  q.push([0, 0, 0]);
  visited[0][0][0] = true;
  let count = 1;

  while (q.length > head) {
    let size = q.length - head;
    for (let i = 0; i < size; i++) {
      const [x, y, z] = q[head++];

      if (x === N - 1 && y === M - 1) {
        return count;
      }

      dir.forEach(([dx, dy]) => {
        const [newx, newy] = [x + dx, y + dy];
        if (newx < 0 || newx >= N || newy < 0 || newy >= M) return;
        if (grid[newx][newy] === 0 && visited[newx][newy][z] === false) {
          q.push([newx, newy, z]);
          visited[newx][newy][z] = true;
        } else if (grid[newx][newy] === 1 && z === 0) {
          q.push([newx, newy, 1]);
          visited[newx][newy][1] = true;
        }
      });
    }
    count++;
  }
  return -1;
};

console.log(solution());
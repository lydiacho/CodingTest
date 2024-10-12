// - NxM 미로, 이동가능여부 1/0, (1,1)에서 출발, (N, M)로 이동. 지나는 최소 칸 수 구하기.
// - input : N, M, 미로숫자  / output : 최소 칸 수
// ⇒ BFS로 (N, M)의 깊이 구하기

const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M] = input1.split(" ").map(Number);
const visited = rest.map((v) =>
  v.split("").map((v) => (v === "1" ? false : true))
); // 바로 방문배열
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const solution = () => {
  const q = [];
  let head = 0;

  q.push([0, 0]);
  visited[0][0] = true;

  let answer = 1; // 시작위치 포함
  while (q.length > head) {
    let size = q.length - head;
    for (let i = 0; i < size; i++) {
      const [x, y] = q[head];
      head++;

      if (x === N - 1 && y === M - 1) return answer;

      dir.map(([dx, dy]) => {
        const newx = x + dx;
        const newy = y + dy;
        if (newx < 0 || newx >= N || newy < 0 || newy >= M) return;
        if (visited[newx][newy]) return;
        q.push([newx, newy]);
        visited[newx][newy] = true;
      });
    }
    answer++;
  }
  return;
};

console.log(solution());

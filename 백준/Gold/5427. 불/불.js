// - 불은 매초마다 인접한 공간으로 퍼짐. 벽에는 불 안붙음.
// - 상근이도 인접한 칸으로 이동하고 1초 걸림.
// - 벽, 불, 불이 붙으려는 칸으로 이동 불가. 최대한 빨리 탈출하기
// - . 빈공간, # 벽, @ 시작 지점, * 불
// - output : 탈출 최단 시간, 탈출 불가할 경우 “IMPOSSIBLE”

const fs = require("fs");
const [T, ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
let t = +T;

const bfs = () => {
  const [너비, 높이] = input.splice(0, 1)[0].split(" ").map(Number);
  const 지도 = input.splice(0, 높이).map((v) => v.split(""));
  const q = [];
  const 불q = [];
  let head = 0;
  let 불head = 0;
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const visited = 지도.map((w, 높이idx) =>
    w.map((v, 너비idx) => {
      if (v === "#") return true;
      if (v === "*") {
        불q.push([높이idx, 너비idx]);
        return true;
      }
      if (v === "@") {
        q.push([높이idx, 너비idx]);
        return true;
      }
      return false;
    })
  );

  let count = 0; // Timer
  while (q.length > head) {
    // 큐에 쌓여있는 불 "먼저" 퍼지게 만들기
    let 불size = 불q.length - 불head;
    for (let i = 0; i < 불size; i++) {
      const [불x, 불y] = 불q[불head];
      불head++;
      dir.map(([dx, dy]) => {
        const [new불x, new불y] = [불x + dx, 불y + dy];
        if (new불x < 0 || new불x >= 높이 || new불y < 0 || new불y >= 너비)
          return;
        if (visited[new불x][new불y]) return;
        visited[new불x][new불y] = true;
        불q.push([new불x, new불y]);
      });
    }

    // 상근이 이동
    let size = q.length - head;
    for (let i = 0; i < size; i++) {
      const [현재x, 현재y] = q[head];
      head++;

      // 종료조건
      if (
        현재x === 0 ||
        현재x === 높이 - 1 ||
        현재y === 0 ||
        현재y === 너비 - 1
      ) {
        return count + 1;
      }

      dir.map(([dx, dy]) => {
        const [newx, newy] = [현재x + dx, 현재y + dy];
        if (newx < 0 || newx >= 높이 || newy < 0 || newy >= 너비) return;
        if (visited[newx][newy]) return;

        q.push([newx, newy]);
        visited[newx][newy] = true;
      });
    }
    count++;
  }
  return "IMPOSSIBLE";
};

const solution = () => {
  const answer = [];

  while (t--) {
    answer.push(bfs());
  }
  return answer.join("\n");
};

console.log(solution());

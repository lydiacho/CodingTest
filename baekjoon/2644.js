// 부모 자식 사이 : 1촌, 자식과 아버지 형제들 : 3촌 (자식 - 부모 - 부모 - 자식)
// 두 사람의 촌수 : 두 사람 정점 사이의 최단 거리 간선 개수
// input : 전체 사람 수 n (각 사람 1~n), 촌수가 궁금한 두사람의 번호, 부모 자식 간 관계 개수 m, 부모 자식 관계의 두 번호 (x,y)
// ouput : 두 사람의 촌수 구하기 (친척관계가 아닐 경우 -1)

const fs = require("fs");
const [input1, input2, _, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const n = +input1; // 정점 수
const [a, b] = input2.split(" ").map((v) => +v);
const arr = rest.map((v) => v.split(" ").map((w) => +w)); // (부모,자식);

// 1. queue 만들기
class Queue {
  constructor() {
    this.queue = [];
  }
  get() {
    return this.queue;
  }
  push(v) {
    this.queue.push(v);
  }
  pop() {
    const front = this.queue[0];
    this.queue.splice(0, 1);
    return front;
  }
  size() {
    return this.queue.length;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}
// 2. 인접리스트 만들기
const adj = Array.from({ length: n + 1 }, () => []);

const solution = () => {
  arr.map(([x, y]) => {
    adj[x].push(y);
    adj[y].push(x);
  });

  const q = new Queue();
  const visited = new Array(n + 1).fill(false);

  q.push(a);
  visited[a] = true;

  let level = 0;
  while (!q.isEmpty()) {
    const size = q.size();
    for (let i = 0; i < size; i++) {
      const curr = q.pop();

      if (curr === b) return level;

      adj[curr].forEach((v) => {
        if (!visited[v]) {
          q.push(v);
          visited[v] = true;
        }
      });
    }
    level++;
  }

  return -1;
};
console.log(solution());

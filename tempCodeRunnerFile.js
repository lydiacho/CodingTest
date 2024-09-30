// 수빈이 위치 N, 동생 위치 K
// 수빈이 이동 방법 : 1초에 x-1, x+1, 2*x
// input : n k
// output : 찾을 수 있는 가장 빠른 시간
const MAX = 100001;

class Queue {
  constructor() {
    this.q = Array.from({ length: MAX }, () => -1);
    this.head = 0;
    this.tail = 0;
  }
  push(v) {
    this.q[this.tail] = v;
    this.tail = (this.tail + 1) % MAX;
  }
  shift() {
    const front = this.q[this.head];
    this.head = (this.head + 1) % MAX;
    return front;
  }
  size() {
    return (this.tail - this.head + MAX) % MAX;
  }
}

const fs = require("fs");
const [n, k] = fs
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

const solution = () => {
  const q = new Queue();
  const visited = new Array(100001).fill(0);

  const queuePush = (pos) => {
    if (pos < 0 || pos > 100000 || visited[pos]) return;
    q.push(pos);
    visited[pos] = 1;
  };

  q.push(n);
  visited[n] = 1;

  // bfs
  let seconds = 0;
  while (q.size() > 0) {
    for (let i = q.size(); i > 0; i--) {
      const curr = q.shift();

      if (curr === k) {
        return seconds;
      }

      queuePush(curr - 1);
      queuePush(curr + 1);
      queuePush(curr * 2);
    }
    seconds++;
  }

  return seconds;
};
console.log(solution());

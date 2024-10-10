// N개의 도시 중 A도시 -> B도시로 이동하는 버스 비용 최소화 (1~N번 도시)
// 다른 도시로 이동하는 버스 M개
// input : 도시 개수 N, 버스 개수 M, 버스정보(출발 도시, 도착도시, 비용), 구하고자하는 출발도시 도착도시
// 비용은 0 ~ 100,000

const fs = require("fs");
const [N, M, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const n = +N;
const m = +M;
const [start, end] = rest.splice(-1, 1)[0].split(" ").map(Number);
const busList = rest.map((v) => v.split(" ").map(Number));

class MinHeap {
  constructor() {
    this.heap = [null];
  }
  heapPush(v) {
    this.heap.push(v);
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);
    while (current > 1) {
      if (this.heap[current].cost < this.heap[parent].cost) {
        [this.heap[current], this.heap[parent]] = [
          this.heap[parent],
          this.heap[current],
        ];
      }
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  heapifyDown(current) {
    let left = current * 2;
    let right = left + 1;
    if (!this.heap[left]) return;
    if (!this.heap[right]) {
      if (this.heap[left].cost < this.heap[current].cost) {
        [this.heap[left], this.heap[current]] = [
          this.heap[current],
          this.heap[left],
        ];
      }
      return;
    }
    if (
      this.heap[current].cost > this.heap[left].cost ||
      this.heap[current].cost > this.heap[right].cost
    ) {
      const min = this.heap[left].cost < this.heap[right].cost ? left : right;
      [this.heap[min], this.heap[current]] = [
        this.heap[current],
        this.heap[min],
      ];
      this.heapifyDown(min);
    }
  }
  heapPop() {
    if (this.heap.length === 2) return this.heap.pop(); // 🧨안넣으면 무한루프🧨
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.heapifyDown(1);
    return returnValue;
  }
  isHeapEmpty() {
    return this.heap.length < 2;
  }
  print() {
    return this.heap;
  }
}

const solution = () => {
  const busAdj = Array.from({ length: n + 1 }, () => []);
  const visited = Array.from({ length: n + 1 }, () => false);
  const MAX = Infinity;
  const dist = Array.from({ length: n + 1 }, () => MAX);

  // busAdj 업데이트
  busList.map(([s, e, c]) => {
    busAdj[s].push({ dest: e, cost: c });
  });

  // Dijstra 시작
  const heap = new MinHeap();
  dist[start] = 0;
  heap.heapPush({ dest: start, cost: 0 });

  while (!heap.isHeapEmpty()) {
    const next = heap.heapPop().dest;
    if (visited[next]) continue;
    visited[next] = true;

    busAdj[next].map(({ dest, cost }) => {
      dist[dest] = Math.min(dist[dest], dist[next] + cost);
      heap.heapPush({ dest: dest, cost: dist[dest] });
    });
  }
  return dist[end];
};
console.log(solution());

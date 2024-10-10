// 방향 그래프, 주어진 시작점에서 다른 모든 정점으로의 최단 경로 (가중치는 10이하 자연수)
// input1 : 정점 V개, 간선 E개, 모든 정점(1~V번)
// input2 : 시작 정점 번호 K
// ...input3 : 간선정보 (u, v, 가중치w)

// 최소힙 구현
class MinHeap {
  constructor() {
    this.heap = [null];
  }
  heap_push(v) {
    this.heap.push(v);
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);
    while (current > 1 && this.heap[current][0] < this.heap[parent][0]) {
      [this.heap[current], this.heap[parent]] = [
        this.heap[parent],
        this.heap[current],
      ];
      current = parent;
      parent = Math.floor(current / 2);
    }
  }
  heapifyDown(current) {
    let left = current * 2;
    let right = left + 1;
    if (!this.heap[left]) return;
    if (!this.heap[right]) {
      if (this.heap[left][0] < this.heap[current][0]) {
        [this.heap[left], this.heap[current]] = [
          this.heap[current],
          this.heap[left],
        ];
      }
      return;
    }
    if (
      this.heap[left][0] < this.heap[current][0] ||
      this.heap[right][0] < this.heap[current][0]
    ) {
      const min = this.heap[left][0] < this.heap[right][0] ? left : right;
      [this.heap[min], this.heap[current]] = [
        this.heap[current],
        this.heap[min],
      ];
      this.heapifyDown(min);
    }
  }

  heap_pop() {
    if (this.heap.length === 2) return this.heap.pop();
    if (this.heap.length === 1) return; // heap이 비어있을 때
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.heapifyDown(1);
    return returnValue;
  }
  is_heap_empty() {
    return this.heap.length < 2;
  }
}

const fs = require("fs");
const [input1, input2, ...input3] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [V, E] = input1.split(" ").map(Number);
const K = +input2;
const edges = input3.map((v) => v.split(" ").map(Number));

// 간선 정보로 인접리스트 만들기
const adj = Array.from({ length: V + 1 }, () => []);

const MAX = 4000000;
const dist = Array.from({ length: V + 1 }, () => MAX); // 가중치가 될 수 없는 무한값
// 방문 여부 체크하는 배열
const visited = Array.from({ length: V + 1 }, () => false);

const solution = () => {
  const heap = new MinHeap(); // 최소거리 정점을 구하기 위한 최소힙

  edges.map(([u, v, w]) => {
    adj[u].push([v, w]);
  });

  // Dijkstra 알고리즘 시작
  // 거리 업데이트와 최소힙 추가는 쌍둥이!
  dist[K] = 0;
  heap.heap_push([dist[K], K]);

  // 최소 정점 방문
  while (!heap.is_heap_empty()) {
    const [_, next] = heap.heap_pop();
    if (visited[next]) continue;
    visited[next] = true;

    // dist 배열 업데이트
    adj[next].map(([v, weight]) => {
      const min = Math.min(dist[v], dist[next] + weight);
      dist[v] = min;
      heap.heap_push([min, v]);
    });
  }

  return dist
    .slice(1)
    .map((v) => (v === MAX ? "INF" : v))
    .join("\n");
};

console.log(solution());

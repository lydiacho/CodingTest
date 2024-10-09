const fs = require("fs");
const [n, ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const ops = input.map(Number);

class MaxHeap {
  constructor() {
    this.heap = [null]; // 인덱스 1부터 씀
  }

  heap_push(value) {
    this.heap.push(value);
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);
    while (current > 1 && this.heap[parent] < value) {
      [this.heap[parent], this.heap[current]] = [
        this.heap[current],
        this.heap[parent],
      ];
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  heapifyDown(current) {
    let left = current * 2;
    let right = current * 2 + 1;

    // 왼쪽 자식도 없다면 리프노트
    if (!this.heap[left]) return;
    // 왼쪽 자식만 있다면 왼쪽과 교환 1번 후 종료
    if (!this.heap[right]) {
      // 왼쪽 자식이 나보다 크다면 교환
      if (this.heap[left] > this.heap[current]) {
        [this.heap[left], this.heap[current]] = [
          this.heap[current],
          this.heap[left],
        ];
      }
      return;
    }

    // 양쪽 자식 모두 있는 경우
    if (
      this.heap[left] > this.heap[current] ||
      this.heap[right] > this.heap[current]
    ) {
      const max = this.heap[left] > this.heap[right] ? left : right;
      [this.heap[max], this.heap[current]] = [
        this.heap[current],
        this.heap[max],
      ];
      this.heapifyDown(max);
    }
  }

  heap_pop() {
    if (this.heap.length === 1) return 0;
    // 루트 정점만 남았을 경우
    if (this.heap.length === 2) return this.heap.pop();

    // 일단 루트 추출
    const returnValue = this.heap[1];
    // 루트로 마지막 노드 이동
    this.heap[1] = this.heap.pop();
    this.heapifyDown(1);
    return returnValue;
  }
}

const solution = () => {
  const heap = new MaxHeap();
  const answer = [];
  ops.map((v) => {
    if (v === 0) {
      answer.push(heap.heap_pop());
    } else {
      heap.heap_push(v);
    }
  });
  return answer.join("\n");
};

console.log(solution());
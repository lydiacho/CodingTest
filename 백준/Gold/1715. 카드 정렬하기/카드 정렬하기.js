// - A장, B장, C장의 카드 그룹이 있을 때, 최소한의 비교 횟수로 카드 그룹을 모두 합치기
// - 최소한의 비교 횟수 → 매번 가장 장수가 적은 그룹 두개를 합쳐야 함
// - 즉, 최소힙을 통해 계속 매번 작은 수를 트래킹해주기
const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const N = +input1;
const cards = input2.map(Number);

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(v) {
    this.heap.push(v);
    if (this.heap.length === 2) return;
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);
    while (this.heap[current] < this.heap[parent]) {
      [this.heap[current], this.heap[parent]] = [
        this.heap[parent],
        this.heap[current],
      ];
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop();
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let current = 1;
    let leftChild = 2;
    let rightChild = 3;
    while (
      this.heap[current] > this.heap[leftChild] ||
      this.heap[current] > this.heap[rightChild]
    ) {
      if (
        this.heap[rightChild] &&
        this.heap[leftChild] > this.heap[rightChild]
      ) {
        [this.heap[current], this.heap[rightChild]] = [
          this.heap[rightChild],
          this.heap[current],
        ];
        current = rightChild;
      } else {
        [this.heap[current], this.heap[leftChild]] = [
          this.heap[leftChild],
          this.heap[current],
        ];
        current = leftChild;
      }
      leftChild = current * 2;
      rightChild = leftChild + 1;
    }
    return returnValue;
  }

  size() {
    return this.heap.length - 1;
  }
}

const solution = () => {
  const heap = new MinHeap();
  cards.forEach((card) => {
    // 돌아가면서 최소 힙에 넣어주기
    heap.push(card);
  });

  // [ 최소 힙에서 두개 pop -> 그 두개의 합을 최소 힙에 push ] 힙 크기가 1이 될 때까지 반복
  let size = heap.size();
  let answer = 0;
  while (size > 1) {
    const n1 = heap.pop();
    const n2 = heap.pop();
    heap.push(n1 + n2);
    answer += n1 + n2;
    size--;
  }
  return answer;
};

console.log(solution());

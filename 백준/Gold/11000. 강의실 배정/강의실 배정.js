const fs = require("fs");
const [N, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
const arr = rest.map((v) => v.split(" ").map(Number));

class Heap {
  constructor() {
    this.heap = [null];
  }
  root() {
    return this.heap[1];
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop();

    const temp = this.heap[1];
    this.heap[1] = this.heap.pop();
    let curr = 1;
    let left = 2;
    let right = 3;
    while (
      this.heap[curr] > this.heap[left] ||
      this.heap[curr] > this.heap[right]
    ) {
      if (this.heap[right] && this.heap[left] > this.heap[right]) {
        [this.heap[curr], this.heap[right]] = [
          this.heap[right],
          this.heap[curr],
        ];
        curr = right;
      } else {
        [this.heap[curr], this.heap[left]] = [this.heap[left], this.heap[curr]];
        curr = left;
      }
      left = curr * 2;
      right = curr * 2 + 1;
    }
    return temp;
  }

  push(v) {
    this.heap.push(v);
    if (this.heap.length === 2) {
      return;
    }
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);
    while (current > 1 && this.heap[parent] > this.heap[current]) {
      [this.heap[current], this.heap[parent]] = [
        this.heap[parent],
        this.heap[current],
      ];
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  size() {
    return this.heap.length - 1;
  }
}

const solution = () => {
  const endTimeHeap = new Heap();

  arr.sort((a, b) => a[0] - b[0]);

  endTimeHeap.push(arr[0][1]);

  for (let i = 1; i < +N; i++) {
    const [start, end] = arr[i];
    const 최소endTime = endTimeHeap.root();
    if (최소endTime <= start) {
      endTimeHeap.pop();
    }
    endTimeHeap.push(end);
  }

  return endTimeHeap.size();
};

console.log(solution());

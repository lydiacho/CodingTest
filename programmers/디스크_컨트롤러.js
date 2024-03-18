class MinHeap {
  constructor() {
      this.heap = [];
  }
  size() {
      return this.heap.length;
  }
  isEmpty() {
      return this.size()===0;
  }
  getParentIndex(currentIndex) {
      return Math.floor((currentIndex - 1) / 2);
  }
  getLeftChildIndex(currentIndex) {
      return currentIndex * 2 + 1;
  }
  getRightChildIndex(currentIndex) {
      return currentIndex * 2 + 2;
  }
  swap(indexA,indexB) {
      [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]];
  }
  heapPush(value) {
      this.heap.push(value);
      this.heapifyUp();
  }
  heapPop() {
      if (this.size()===1) return this.heap.pop();
      const target = this.heap[0];
      this.heap[0] = this.heap.pop();

      if (this.size()===1) return target;

      this.heapifyDown();

      return target;
      
  }
  heapifyUp(index) {
      let currentIndex = index ? index : this.size()-1; // 특정 요소 있으면 넣고 없으면 마지막 노드 
      let parentIndex = this.getParentIndex(currentIndex);
  
      while (parentIndex >= 0 && (this.heap[currentIndex][0] <= this.heap[parentIndex][0])) {
          if (this.heap[currentIndex][0] == this.heap[parentIndex][0] && this.heap[currentIndex][1] >= this.heap[parentIndex][1]) break;
          this.swap(currentIndex, parentIndex);
  
          currentIndex = parentIndex;
          parentIndex = this.getParentIndex(currentIndex); 
      }
  }
  heapifyDown() {
      let currentIndex = 0;
      let leftChildIndex = 1;
      let rightChildIndex = 2;
      let minChildIndex = (this.heap[rightChildIndex] && this.heap[rightChildIndex][0] < this.heap[leftChildIndex][0] ? rightChildIndex : leftChildIndex);

      while (this.heap[minChildIndex] && this.heap[currentIndex][0] >= this.heap[minChildIndex][0]) {
        if (this.heap[currentIndex][0] == this.heap[minChildIndex][0] && this.heap[currentIndex][1] <= this.heap[minChildIndex][1]) break;
          this.swap(currentIndex, minChildIndex);
  
          currentIndex = minChildIndex;
          leftChildIndex = this.getLeftChildIndex(currentIndex);
          rightChildIndex = this.getRightChildIndex(currentIndex);
          minChildIndex = (this.heap[rightChildIndex] && this.heap[rightChildIndex][0] < this.heap[leftChildIndex][0] ? rightChildIndex : leftChildIndex);
      }
  }
}

function solution(jobs) {
  const answer = [];
  const heap = new MinHeap();
  jobs.forEach((v)=>heap.heapPush(v));
  let updateTime = heap.heap[0][0];

  const task = heap.heapPop();
  updateTime += task[1];
  answer.push(updateTime-task[0]);

  while(true){
    const tempArr = heap.heap.filter((v)=> v[0]<=updateTime );
    if (tempArr.length===0) {
      // 작업 스케줄에 텀 발생 
      console.log("텀 발생 : ",heap.heap[0])
      const task = heap.heapPop();
      updateTime += task[1];
      answer.push(updateTime-task[0]);
      continue;
    }

    tempArr.sort((a,b)=>a[1]-b[1])
    const removeIdx = heap.heap.indexOf(tempArr[0]);

    const tempRoot = heap.heap[0];
    if (removeIdx !== 0 ) heap.swap(0,removeIdx);
    const removeTask = heap.heapPop();
    updateTime += removeTask[1];
    answer.push(updateTime-removeTask[0]);

    if (heap.size()===1) break;
    heap.heapifyUp(heap.heap.indexOf(tempRoot));
    

  }
  if (heap.heap[0][0] > updateTime) {
    answer.push(heap.heap[0][1]);
  } else {
      answer.push(updateTime+heap.heap[0][1]-heap.heap[0][0]);
  }


  let avg = 0;
  answer.forEach(v=>avg+=v)
  return Math.floor(avg/jobs.length);
}

// 19 실패, 20 런타임에러 => 90/100 점 
console.log(solution([[0, 5], [2, 10], [10000, 2]]))


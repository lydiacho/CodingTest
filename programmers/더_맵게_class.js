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
    heapifyUp() {
        let currentIndex = this.size()-1;
        let parentIndex = this.getParentIndex(currentIndex);
    
        while (parentIndex >= 0 && this.heap[currentIndex] < this.heap[parentIndex]) {
            this.swap(currentIndex, parentIndex);
    
            currentIndex = parentIndex;
            parentIndex = this.getParentIndex(currentIndex); 
        }
    }
    heapifyDown() {
        let currentIndex = 0;
        let leftChildIndex = 1;
        let rightChildIndex = 2;
        let minChildIndex = (this.heap[rightChildIndex] && this.heap[rightChildIndex] < this.heap[leftChildIndex] ? rightChildIndex : leftChildIndex);
    
    
        while (this.heap[currentIndex] > this.heap[minChildIndex]) {
            this.swap(currentIndex, minChildIndex);
    
    
            currentIndex = minChildIndex;
            leftChildIndex = this.getLeftChildIndex(currentIndex);
            rightChildIndex = this.getRightChildIndex(currentIndex);
            minChildIndex = (this.heap[rightChildIndex] && this.heap[rightChildIndex] < this.heap[leftChildIndex] ? rightChildIndex : leftChildIndex);
        }
    }
}

function solution(scoville, K) {
    let answer = 0;
    const heap = new MinHeap();
    scoville.forEach((v)=>heap.heapPush(v));
    
    while (heap.heap[0] < K) {
        if (heap.size() === 1) {
            answer = -1;
            break;
        }
        heap.heapPush(heap.heapPop() + heap.heapPop() * 2);
        answer++;
    }

    return answer;
}

console.log(solution([1, 2, 3, 9, 10, 12],7));
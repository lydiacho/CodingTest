/*
- 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 스코빌 지수가 가장 낮은 두 개의 음식을 섞어 새로운 음식 만듦
- 섞은 음식의 스코빌 지수 = 가장 낮은 스코빌 지수 + (두 번째로 낮은 스코빌 지수 * 2)
- 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞음 
- 음식의 스코빌 지수 배열 scoville, 원하는 스코필 지수 K, 최소 횟수 리턴 
- 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return
*/

/* 고민로직 :
- 반복 (최솟값이 K보다 작은 동안)
- 스코빌 지수 배열에서 최솟값 두개를 뽑아서 새 스코빌지수 계산 
- 최솟값 두개는 배열에서 삭제하고 새 지수 추가. -> 후 정렬 
*/

// 테케는 다 통과했지만 효율성 0점
// function solution(scoville, K) {
//   let temp;
//   let count = 0;

//   scoville.sort((a, b) => a - b); //오름차순 정렬

//   while (scoville[1] !== undefined && scoville[0] < K) {
//     temp = scoville[0] + scoville[1] * 2;
//     scoville.splice(0, 2);
//     scoville.push(temp);
//     scoville.sort((a, b) => a - b);
//     count++;
//   }

//   // 실패한 경우 -1 리턴
//   if (scoville[1] === undefined && scoville[0] < K) count = -1;

//   return count;
// }

// 최소힙으로 구현해보는 방법
/* 고민로직 : 
- 반복 (root가 K보다 작은 동안)
- 최솟값 두개를 뽑아서 새 스코빌지수 계산 
- 최솟값 두개는 배열에서 삭제하고 새 지수 추가. (push)
- heapify : 추가한 값과 부모 값을 비교해서 더 작으면 swap
*/

class MinHeap {
  // 힙 생성
  constructor() {
    this.heap = [];
  }

  // 힙 크기
  size() {
    return this.heap.length;
  }

  // 힙 요소 교환 (by 구조분해할당)
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  // 힙에 요소 추가
  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  // 힙 루트 요소 삭제
  poll() {
    if (this.size() === 1) {
      return this.heap.pop();
    }
    if (this.size() === 0) {
      return null;
    }
    const value = this.heap[0];
    this.heap[0] = this.heap.pop(); // 루트값(최소) 삭제 후 마지막 요소를 루트로 이동 (빈 [0]를 한번에 채우기위해.)
    this.bubbleDown(); // 루트 요소 heapify
    return value;
  }

  // 마지막 요소를 위로 올리는 heapify
  bubbleUp() {
    let index = this.size() - 1; // 마지막 요소
    let parentIdx = Math.floor((index - 1) / 2); // 마지막 요소의 부모 요소
    while (this.heap[index] < this.heap[parentIdx]) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  // 루트 요소를 아래로 내리는 heapify
  bubbleDown() {
    let parent_Idx = 0; // 루트 요소
    let left_Idx = parent_Idx * 2 + 1;
    let right_Idx = parent_Idx * 2 + 2;

    while (
      (left_Idx <= this.size() - 1 &&
        this.heap[left_Idx] < this.heap[parent_Idx]) ||
      (right_Idx <= this.size() - 1 &&
        this.heap[right_Idx] < this.heap[parent_Idx])
    ) {
      //오른쪽이 왼쪽보다 작고 오른쪽 노드가 존재한다면 부모와 오른쪽이 바꿔야함
      if (
        this.heap[right_Idx] < this.heap[left_Idx] &&
        right_Idx <= this.size() - 1
      ) {
        //오른쪽과 부모노드를 swap 한다.
        this.swap(right_Idx, parent_Idx);
        parent_Idx = right_Idx;
        right_Idx = parent_Idx * 2 + 2;
        left_Idx = parent_Idx * 2 + 1;
      } else {
        //왼쪽과 부모노드를 swap 한다.
        this.swap(left_Idx, parent_Idx);
        parent_Idx = left_Idx;
        right_Idx = parent_Idx * 2 + 2;
        left_Idx = parent_Idx * 2 + 1;
      }
    }
  }
}

function solution(scoville, K) {
  let count = 0;

  // 힙 생성
  const h = new MinHeap();
  scoville.forEach((v) => h.add(v));

  while (h.size() > 1 && h.heap[0] < K) {
    let first = h.poll();
    let second = h.poll();
    let temp = first + second * 2;
    h.add(temp);
    count++;
  }

  // 실패한 경우 -1 리턴
  if (h.heap[0] >= K) return count;
  else return -1;
}

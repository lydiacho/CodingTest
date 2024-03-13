function heapifyUp (array) {
    let currentIndex = array.length - 1;
    let parentIndex = Math.floor((array.length - 2) / 2);

    while (parentIndex >= 0 && array[currentIndex] < array[parentIndex]) {
        const temp = array[currentIndex];
        array[currentIndex] = array[parentIndex];
        array[parentIndex] = temp;

        currentIndex = parentIndex;
        parentIndex = Math.floor((currentIndex - 1) / 2 ); 
    }
    return array;
}

function remove (array) {
    // 요소가 1개 뿐일 경우, pop하고 다시 넣으면 안됨. 
    if (array.length===1) return array.pop();
    const target = array[0];
    array[0] = array.pop(); // 마지막 요소는 heapifyDown 해서 살리고, 루트 요소만 삭제 

    if (array.length===1) return target;  // array에 요소가 1개 남았을 경우 더이상 정렬할 필요 X

    let currentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;
    let minChildIndex = (array[rightChildIndex] && array[rightChildIndex] < array[leftChildIndex] ? rightChildIndex : leftChildIndex);


    while (array[currentIndex] > array[minChildIndex]) {
        const temp = array[currentIndex];
        array[currentIndex] = array[minChildIndex];
        array[minChildIndex] = temp;


        currentIndex = minChildIndex;
        leftChildIndex = currentIndex * 2 + 1;
        rightChildIndex = currentIndex * 2 + 2;
        minChildIndex = (array[rightChildIndex] && array[rightChildIndex] < array[leftChildIndex] ? rightChildIndex : leftChildIndex);
    }

    return target;
}

function solution(scoville, K) {
    scoville.sort((a,b)=>a-b);
    let answer = 0;
    
    while (scoville[0] < K) {
        if (scoville.length === 1) {
            answer = -1;
            break;
        }
        scoville.push(remove(scoville) + remove(scoville) * 2);
        heapifyUp(scoville);
        answer++;
    }

    return answer;
}

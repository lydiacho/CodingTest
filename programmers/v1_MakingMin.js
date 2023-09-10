/* 고민로직 : 
- A, B를 각각 정렬 후, 
- A는 오름차순으로, B는 내립차순으로 매칭해서 곱하여 합산 
- B는 오름차순으로, A는 내림차순으로 매칭해서 곱하여 합산 
- 둘중 더 작은 수 return 
*/

function solution(A, B) {
  let sum1 = 0;
  let sum2 = 0;
  let n = A.length;

  A.sort((a, b) => b - a);
  B.sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    sum1 += A[i] * B[i];
    sum2 += A[n - 1 - i] * B[n - 1 - i];
  }

  return Math.min(sum1, sum2);
}

console.log(solution([1, 4, 2], [5, 4, 4]));

/* 베스트 답안 
function solution(A,B){
    A.sort((a, b) => a - b)
    B.sort((a, b) => b - a)
    return A.reduce((total, val, idx) => total + val * B[idx], 0)
}
- reduce 메소드 알아보기
*/

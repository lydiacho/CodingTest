// 스택으로 풀어보자
/* 고민 로직 : 
- number의 앞글자부터 stack에 넣기 
- 만약 stack의 top이 넣으려는 수보다 작을경우 top 제거 
- stack의 top이 넣으려는 수보다 클 경우 새로운 수 push
- pop한 횟수가 k번이 되면 앞뒤 연결하고 반복 정지 
*/
// v1
// function solution(number, k) {
//   let answer = "";
//   let i = 0;
//   let count = 0;
//   const stack = [];
//   while (i < number.length) {
//     if (count === k) {
//       answer += number.slice(i, number.length);
//       break;
//     }
//     if (stack.length !== 0 && stack[stack.length - 1] < number[i]) {
//       stack.pop();
//       count++;
//       continue;
//     } else {
//       stack.push(number[i]);
//       i++;
//     }
//   }

//   answer = stack.join("") + answer;

//   // 만약 앞자리보다뒷자리가 큰 경우가 하나도 없을 떄를 대비하여 k개 억지로 자르기
//   return answer.slice(0, number.length - k);
// }

// v2 (코드 조금 더 줄여보기)
function solution(number, k) {
  let i = 0;
  let count = k;
  const stack = [];
  while (i < number.length && count) {
    if (stack.length !== 0 && stack[stack.length - 1] < number[i]) {
      stack.pop();
      count--;
      continue;
    }
    stack.push(number[i++]);
  }

  return (stack.join("") + number.slice(i, number.length)).slice(
    0,
    number.length - k
  );
}

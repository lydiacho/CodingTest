/* 문제요약 : 
- array의 i번째~j번째까지 자르고 정렬했을 떄, k번째 수 구하기 
*/

// 주의 : sort()함수는 기본적을 '유니코드 순서'대로 정렬한다. 따라서 숫자를 정렬할 때도 11이 2보다 앞에 오게 되므로 (a,b)=>a-b 로직을 꼭 명시해야한다.
function solution(array, commands) {
  const answer = [];
  let temp = [];
  for (command of commands) {
    temp = array.slice(command[0] - 1, command[1]);
    answer.push(...temp.sort((a, b) => a - b).splice(command[2] - 1, 1));
  }
  return answer;
}

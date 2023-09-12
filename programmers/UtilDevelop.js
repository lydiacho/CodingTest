/* 고민 로직 
- progresses : 각 작업의 진도 정도. 앞일 수록 우선순위 높음 
- speeds : 각 작업의 개발 속도 
- 남은 업무량 : 100-progresses[x]
- 업무 완성까지 며칠걸릴지 : Math.ceil((100-progresses[x])/speeds)
- 각 업무의 남은 작업일 수를 놓고 보았을때, 앞 수보다 작은 뒤 수는 모두 앞과 함께 배포 
- 배열 앞에서부터 순회하면서 max 변수 관리. 매번 최대 값을 만나면 max update 
- max >= 현재요소 : count+1 (동시에 배포할 기능 개수 추가)
- max < 현재요소 : max 값을 현재요소로 update, count는 현재값 answer 배열에 추가 후 0으로 초기화 
*/

function solution(progresses, speeds) {
  var answer = [];

  const days = progresses.map((el, idx) => Math.ceil((100 - el) / speeds[idx]));

  let max = days[0];
  let count = 0;
  for (day of days) {
    if (max >= day) {
      count++;
      continue;
    }
    max = day;
    answer.push(count);
    count = 1;
  }
  answer.push(count);
  return answer;
}

console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));
// 7, 3, 9

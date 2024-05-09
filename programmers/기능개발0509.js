// progresses : 작업 진도 배열 
// speeds : 작업 개발 속도 
// 각 배포마다 몇 개의 기능 배포되는지? 
// sol: 남은 진도 / 개발 속도 -> 며칠 필요한지 계산 
// 앞에서부터 순회하면서 max보다 작으면 count 수 늘리기 
// max보다 크면 push하고 count, max 초기화 
function solution(progresses, speeds) {
  const days = progresses.map((v,i)=>Math.ceil((100-v)/speeds[i]));
  let max = days[0];
  let count = 0;
  const answer = days.reduce((acc,curr)=>{
    if (curr <= max) {
      count++; 
    } else {
      acc.push(count);
      count = 1;
      max = curr;
    }
    return acc;
  },[]);
  answer.push(count);
  return answer;
}
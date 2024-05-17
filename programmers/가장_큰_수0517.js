// 0,양의 정수가 주어졌을 때, 정수를 이어붙여 만들 수 있는 가장 큰 수 
// sol : 숫자를 문자 기준 사전순으로 배열하여 큰 수부터 나열하기 
function solution(numbers) {
  const answer = numbers.sort((a,b)=>(`${a}`.length===`${b}`.length) ? b-a : (""+b+a)-(""+a+b)).join('');
  return answer[0]==='0' ? '0' : answer;
}
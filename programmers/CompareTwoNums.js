/* 
정수 num1과 num2가 매개변수로 주어집니다. 
두 수가 같으면 1 다르면 -1을 retrun하도록 solution 함수를 완성해주세요.
*/

function solution(num1, num2) {
  var answer = 0;

  answer = num1 === num2 ? 1 : -1;

  return answer;
}

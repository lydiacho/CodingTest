/*
정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.
*/
// 1~n 모두 순회하는 방식
function solution1(n) {
  var answer = 0;
  for (i = n; i >= 1; i--) {
    if (n % i === 0) answer += i;
  }
  return answer;
}

// 루트n~n까지만 순회하는 방식
function solution2(n) {
  var answer = 0;
  for (i = n; i > Math.sqrt(n); i--) {
    if (n % i === 0) {
      answer += i + n / i;
    }
  }
  // 제곱수일 경우 한번만 더해주기
  if (i === Math.sqrt(n)) {
    answer += i;
  }
  return answer;
}

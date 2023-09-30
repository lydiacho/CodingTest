/*
n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다.
사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 
숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.
*/
/* 고민 로직 : 
- dfs : 더한 숫자 수가 numbers.length이고, sum이 target일 때 count+1, return 
- 왼쪽 child로 dfs 호출 (sum + 현재 root)
- 오른쪽 child로 dfs 호출 (sum - 현재 root)
*/

function solution(numbers, target) {
  var answer = 0;
  let idx = 0;
  function dfs(sum, idx) {
    if (idx === numbers.length) {
      if (sum === target) {
        answer++;
      }
      return;
    }
    dfs(sum - numbers[idx], idx + 1);
    dfs(sum + numbers[idx], idx + 1);
  }
  dfs(0, 0);

  return answer;
}

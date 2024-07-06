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

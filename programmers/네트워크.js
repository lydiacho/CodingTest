function solution(n, computers) {
  var answer = 0;
  const visited = new Array(n).fill(false);

  function dfs(idx) {
    if (visited[idx] === true) {
      return false;
    }
    visited[idx] = true;
    for (let k = 0; k < n; k++) {
      if (computers[idx][k] === 1) dfs(k);
    }
    return true;
  }

  for (let i = 0; i < n; i++) {
    if (dfs(i) === true) {
      answer++;
    }
  }
  return answer;
}

/* 고민 로직 : 
- 모든 컴퓨터에 대해서 for문 돌리면서 dfs 실행
  - dfs 반환값이 true면 answer++ 
- dfs 함수 : 인접한 노드를 모두 방문처리
  - 현재 노드가 아직 방문하지 않은 노드라면 방문처리 
    - 인접한 모든 노드를 순회하며 
    - 아직 방문하지 않은 노드면 방문처리 
  - 현재 노드가 이미 방문한 노드라면 false 리턴
*/

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

# DFS / BFS

## 코드트리

### DFS_BFS

## 프로그래머스

### [타겟넘버](https://school.programmers.co.kr/learn/courses/30/lessons/43165) (Lv.2) => DFS

```js
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
```

### [네트워크](https://school.programmers.co.kr/learn/courses/30/lessons/43162) (Lv.3) => DFS

```js
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
```

### [게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844) (Lv.2) => BFS

### [단어변환](https://school.programmers.co.kr/learn/courses/30/lessons/43163) (Lv.3) => BFS

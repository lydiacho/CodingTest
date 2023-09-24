/* 고민 로직 :
- 재귀함수를 사용한 반복 
*/

let answer;
let visited;

function dfs(k, cnt, dungeons) {
  // answer와 cnt 체크
  if (cnt > answer) answer = cnt;

  dungeons.forEach((el, idx) => {
    if (k >= el[0] && visited[idx] === 0) {
      visited[idx] = 1;
      dfs(k - el[1], cnt + 1, dungeons);
      visited[idx] = 0;
    }
  });
}

function solution(k, dungeons) {
  answer = 0;
  visited = new Array(dungeons.length).fill(0);

  dfs(k, 0, dungeons);

  return answer;
}

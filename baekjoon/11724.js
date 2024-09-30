// 무방향 그래프의 연결 컴포넌트 개수 구하기
// input : 정점개수n, 간선개수m, 간선 양끝점(u,v)
// output : 컴포넌트 개수

// dfs로 탐색하면서 컴포넌트 끊길때마다 카운팅해주기
// 정점의 개수만큼 이차원배열을 만들어주고, edges를 순회하면서 인접리스트 완성해주기
// dfs(시작노드) 실행
// dfs 내부 : 시작노드 방문체크 -> 현재노드와 인접한 노드를 순회하며 아직 방문 안한 노드에서 dfs() 재귀실행

const fs = require("fs");
const [first, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
const [n, _] = first.split(" ").map((v) => +v);
const edges = rest.map((v) => v.split(" ").map((w) => +w));
const visited = Array.from({ length: n + 1 }, () => 0);
const adj = Array.from({ length: n + 1 }, () => []);

const dfs = (node) => {
  visited[node] = 1;

  adj[node].forEach((v) => {
    if (!visited[v]) {
      dfs(v);
    }
  });
};

const solution = () => {
  // 인접리스트 만들기
  edges.forEach(([u, v]) => {
    // 무방향이니 양쪽 push
    adj[u].push(v);
    adj[v].push(u);
  });

  // 모든 노드에서부터 dfs 실행 for 컴포넌트 카운팅
  let count = 0;
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
      count++;
    }
  }

  return count;
};
console.log(solution());

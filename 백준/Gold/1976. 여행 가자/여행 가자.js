// 도시 N개, 각 도시는 연결 되기도/안되기도. 여행 가능한 경로인지 구하기
// 중간에 다른 도시 경유 가능. 같은 도시 여러번 방문 가능
// 즉, 여행하고자 하는 경로의 각 도시가 같은 집합에 속해있는지 구하는 문제
// input : 도시들의 개수, 도시들간 연결 여부, 여행 계획

const fs = require("fs");
const [N, M, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const n = +N;
const m = +M;
const trip = rest.splice(-1, 1)[0].split(" ").map(Number);
const adj = rest.map((v) => v.split(" ").map(Number));
const p = Array.from({ length: n }, () => -1);

const findRoot = (v) => {
  if (p[v] < 0) return v;
  p[v] = findRoot(p[v]);
  return p[v];
};

const merge = (a, b) => {
  a = findRoot(a);
  b = findRoot(b);
  if (a === b) return;
  const [max, min] = a < b ? [a, b] : [b, a]; //집합크기가 더 큰 max
  p[max] += p[min];
  p[min] = max;
};

const solution = () => {
  // 1. 연결 정보 배열을 p배열로 나타내기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!adj[i][j]) continue;
      // 인접한 도시일 경우, merge로 같은 집합으로 묶어주기
      merge(i, j);
    }
  }

  // 2. 여행 계획이 가능한 경로인지 판단하기
  let root = findRoot(trip[0] - 1);
  for (let i = 1; i < m; i++) {
    const temp = findRoot(trip[i] - 1);
    if (root !== temp) return "NO";
  }
  return "YES";
};

console.log(solution());

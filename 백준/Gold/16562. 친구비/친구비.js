// 돈 주고 사람과 친구가 될 수 있음. 친구의 친구는 친구임
// 가장 적은 비용으로 모든 사람과 친구되는 방법 구하기
// 각 집합 내에 가장 비용이 저렴한 학생들에게 돈을 쓰면 됨.
// 🧨관건 : 루트가 같은 애들끼리의 최소비용을 어떻게 구하지? -> findRoot가 아닌 findParent 로직 사용

const fs = require("fs");
const [input1, input2, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [n, _, k] = input1.split(" ").map(Number);
const costs = [0, ...input2.split(" ").map(Number)]; // 학생 번호 1번부터
const adj = rest.map((v) => v.split(" ").map(Number));
const p = Array.from({ length: n + 1 }, () => -1); // 학생 번호 1번부터

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
  // 1. 친구관계를 유니온파인드 자료구조로 만들기
  adj.map(([v, w]) => {
    merge(v, w);
  });

  // 2. 각 집합 내에 최소 비용 찾기 => 루트가 같은 애들끼리 비교
  // 루트 학생 걸러내기
  const arr = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i <= n; i++) {
    arr[findRoot(i)].push(costs[i]); // 🧨 findRoot를 새로 구해줘야함
  }
  // 최소 비용 구하기
  let minCost = 0;
  arr.map((v) => {
    if (v.length === 0) return;
    minCost += Math.min(...v);
  });
  return minCost <= k ? minCost : "Oh no";
};

console.log(solution());

// n+1개의 집합 {0}, {1}, ... {n} -> 합집합 연산, 같은집합 포함여부 연산 구현
// input : n, m(연산 수) / 각 연산 (0 : 합집합, 1 : 같은집합 포함여부 연산)
// output : 1 연산에 대해 -> 같은집합 포함여부

const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [n, _] = input1.split(" ").map(Number);
const ops = rest.map((v) => v.split(" ").map(Number));
const p = Array.from({ length: n + 1 }, () => -1);

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
  ops.map(([op, a, b]) => {
    if (op === 0) {
      merge(a, b);
      return;
    }
    if (op === 1) {
      if (findRoot(a) === findRoot(b)) {
        console.log("YES");
      } else {
        console.log("NO");
      }
    }
  });
};

solution();

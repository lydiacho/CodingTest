// N가지 종류의 동전, 가치의 합이 K원이 되도록, 최소한의 동전 개수
// 동전은 여러번 사용 가능, 가치가 같은 동전 여러번 등장 가능
// input : n, k, 각 동전의 가치 (100,000 이하)
// output : 사용한 동전 개수

// F(n) : 가지고 있는 동전으로 n을 만드는 경우의 수
// F(15) -> 1+F(14), 1+F(10), 1+F(3)
// F(10) -> 1+F(9), 1+F(5)
// F(5) -> 1+F(4), 1
// F(3) -> 1+F(2) -> 1+F(1) -> 1
// F(15)는 1+(1+(1+F(1)))=4 도 있고, 1+(1+F(5))=3도 있어서, 이중 최솟값인 3으로.

// 일반화
// F(k) = Math.min(1+F(k-x1), 1+F(k-x2), 1+F(k-x3), ...)

const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [_, k] = input1.split(" ").map(Number);
const arr = Array.from(new Set(input2.map(Number))).sort((a, b) => a - b); // arr -> set -> arr로 변경
// 메모이제이션 배열에서 불가능한 값은 -2, 동전들의 가치는 1로 초기화 
const memory = Array.from({ length: 10001 }, (_, i) => (i < arr[0] ? -2 : -1));
arr.map((v) => {
  memory[v] = 1;
});
const MAX = 10001;

const dp = (k) => {
  if (memory[k] !== -1) return memory[k];
  let temp = MAX;
  arr.map((v) => {
    if (v > k) return;
    const res = dp(k - v);
    if (res !== -2) {
      temp = Math.min(temp, res);
    }
  });
  if (temp === MAX) {
    memory[k] = -2;
  } else {
    memory[k] = temp + 1;
  }
  return memory[k];
};

const solution = (k) => {
  const ans = dp(k);
  return ans !== -2 ? ans : -1;
};

console.log(solution(k));

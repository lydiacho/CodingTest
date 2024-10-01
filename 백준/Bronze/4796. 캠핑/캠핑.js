// 연속 P일 중 L일만 사용 가능하면 V일 휴가 중 최대 며칠 사용 가능? (1 < L < P < V)
// input : [ L, P, V ]...
// output : "CaseN : 00"
// P일 기간 중 무조건 맨처음 V일에 캠핑장을 사용하기 (greedy)

const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");
const arr = input.slice(0, -1).map((v) => v.split(" ").map((w) => +w));

const solution = (arr) => {
  arr.map(([l, p, v], i) => {
    console.log(`Case ${i + 1}: ${Math.floor(v / p) * l + Math.min(v % p, l)}`);
  });
};

solution(arr);
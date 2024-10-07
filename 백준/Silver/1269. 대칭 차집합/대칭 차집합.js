// 공집합이 아닌 두 집합의 대칭 차집합 원소 수. (A-B)와(B-A)의 합집합.
// input : 집합 A, B의 원소의 개수 / 집합 A의 모든 원소 / 집합 B의 모든 원소 (집합 원소 수 20만 이하)

// sol : 대칭 차집합 원소 수 = A개수 + B개수 - 2 * (A와 B의 교집합 개수)
// 따라서 교집합의 원소 수를 구하는 문제로 줄일 수 있음 -> set으로 중복 여부 체크하기
// 🧨 중요 : array includes는 O(N), set의 has는 O(1)이다!

const fs = require("fs");
const [input1, input2, input3] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [numA, numB] = input1.split(" ").map(Number);
const arrA = input2.split(" ").map(Number);
const arrB = input3.split(" ").map(Number);

const solution = () => {
  const setA = new Set(arrA);
  let count = 0;
  arrB.map((v) => {
    if (setA.has(v)) count++;
  });
  return numA + numB - 2 * count;
};

console.log(solution());

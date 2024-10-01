// 정수 N이 3의 배수이면 3으로 나눔 , 2의 배수이면 2로 나눔 , 1을 뺌
// 연산 세개를 활용해서 1 만들기. 연산의 최소 횟수 구하기
// input : 정수 N (1~10^6)
// output : 연산 횟수 최솟값

// N부터 세가지 연산을 모두 계산하기를 반복 -> 단, 메모이제이션을 통해 시간 절약

// 🧨 재귀호출 사용 시 런타임에러가 발생해 반복문 사용하도록 수정

const fs = require("fs");
const N = fs.readFileSync(0).toString().trim();

const solution = (n) => {
  const mem = new Array(1000001).fill(-1);
  mem[1] = 0;

  for (let i = 1; i < n; i++) {
    const newVal = mem[i] + 1;
    mem[i + 1] = mem[i + 1] !== -1 ? Math.min(mem[i + 1], newVal) : newVal;
    mem[i * 2] = mem[i * 2] !== -1 ? Math.min(mem[i * 2], newVal) : newVal;
    mem[i * 3] = mem[i * 3] !== -1 ? Math.min(mem[i * 3], newVal) : newVal;
  }
  return mem[n];
};

console.log(solution(+N));

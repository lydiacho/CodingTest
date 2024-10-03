// 자연수 A를 B번 곱하기 -> C로 나눈 나머지 구하기
// input : A, B, C (2,147,483,647 이하)
// 🧨 관건 : 나머지 연산의 특징 -> (A+B)modC = (AmodC+BmodC)modC (합,뺄셈,곱에 해당)

const fs = require("fs");
const [a, b, c] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

// const exp_modulo = (n, e, divisor) => {
//   if (e === 0) return 1;
//   if (e === 1) return n;
//   const ans = exp_modulo(n, Math.floor(e / 2), divisor);
//   return (((ans * ans) % divisor) * (e % 2 === 0 ? 1 : n)) % divisor;
// };

const solution = (x, y, z) => {
  x = BigInt(x);
  z = BigInt(z);
  const exp_modulo = (exp) => {
    if (exp === 1) return x % z;
    const half = exp_modulo(Math.floor(exp / 2));
    if (exp % 2 === 0) return (half * half) % z;
    return (((half * half) % z) * (x % z)) % z;
  };
  return exp_modulo(y);
};

console.log(solution(a, b, c).toString());

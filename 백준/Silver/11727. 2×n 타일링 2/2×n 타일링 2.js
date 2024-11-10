// 2xn 크기 직사각형을 2x1, 1x2 타일로 채우는 방법 수 구하기
const fs = require("fs");
const N = +fs.readFileSync(0).toString().trim();

const solution = () => {
  // dp(1) -> 1가지
  // dp(2) -> 3가지
  // dp(i) -> dp(i-2)*2 + dp(i-1)
  const mem = Array.from({ length: N + 1 }, () => 0);
  mem[1] = 1;
  mem[2] = 3;
  for (let i = 3; i <= N; i++) {
    mem[i] = (((mem[i - 2] * 2) % 10007) + (mem[i - 1] % 10007)) % 10007;
  }
  return mem[N];
};

console.log(solution());

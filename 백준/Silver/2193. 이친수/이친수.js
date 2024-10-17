// - 특별한 성질을 갖는 이진수 : 이친수
// - 0으로 시작하지 않음. 1이 두번연속 나타나지 않음.
// - 1~90인 N이 주어졌을 때, N자리 이친수 개수 구하기
// - sol : 첫째자리는 1, 둘째자리 0으로 고정, 이후는 DP (경우의 수가 나뉘므로 이차원 배열 dp)
// 🧨 답이 number형의 범위를 넘기 때문에 BigInt 처리 해줘야 함. 출력 시엔 toString.

const fs = require("fs");
const n = +fs.readFileSync(0).toString().trim();

const solution = () => {
  // 나머지 n-2자리를 0또는 1로 채워야함 (1이 중복되지 않도록)
  if (n === 1 || n === 2) return 1;
  const mem = Array.from({ length: n - 2 }, () =>
    Array.from({ length: 2 }, () => BigInt(0))
  );
  // mem[i][j] = i자리에 0/1이 올 때 이친수 개수
  mem[0] = [BigInt(1), BigInt(1)];
  for (let i = 1; i < n - 2; i++) {
    mem[i][0] = mem[i - 1][1] + mem[i - 1][0]; // 0일 때
    mem[i][1] = mem[i - 1][0]; // 1일 때
  }
  return mem[n - 3][0] + mem[n - 3][1];
};

console.log(solution().toString());

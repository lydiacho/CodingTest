// 0으로 시작하지 않고, 1이 두번 연속 나타나지 않음
// N자리 이친수 개수 구하기

const fs = require("fs");
const N = +fs.readFileSync(0).toString().trim();

const solution = () => {
  // 앞자리는 무조건 1로 시작
  const arr = Array.from({ length: N + 1 }, () =>
    Array.from({ length: 2 }, () => -1)
  ); // i자리에 j가 올 때 이친수의 개수
  arr[1] = [BigInt(0), BigInt(1)]; // [0이 올때, 1이 올 때]
  for (let i = 2; i <= N; i++) {
    arr[i][0] = arr[i - 1][0] + arr[i - 1][1]; // 앞자리가 0,1일 때
    arr[i][1] = arr[i - 1][0]; // 앞자리가 0일 때
  }
  return arr[N].reduce((acc, curr) => acc + curr, BigInt(0)).toString();
};

console.log(solution());

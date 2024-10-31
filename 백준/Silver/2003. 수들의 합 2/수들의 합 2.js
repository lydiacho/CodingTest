// 온도 수열에서, 연속적인 온도 합이 가장 큰 값
// 날짜수는 십만 이하임 주의
// 슬라이딩 윈도우인가 그거 같음

const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M] = input1.split(" ").map(Number);
const arr = input2.split(" ").map(Number);

const solution = () => {
  const 구간합arr = Array.from({ length: N + 1 }, () => 0);
  for (let i = 1; i <= N; i++) {
    구간합arr[i] = 구간합arr[i - 1] + arr[i - 1];
  }

  let i = 0;
  let j = 1;
  let count = 0;
  while (i <= j && j <= N) {
    if (i === j) j++;
    const sum = 구간합arr[j] - 구간합arr[i];
    if (sum === M) {
      count++;
      j++;
    } else if (sum < M) {
      if (j === N) {
        break;
      }
      j++;
    } else {
      i++;
    }
  }

  return count;
};

console.log(solution());

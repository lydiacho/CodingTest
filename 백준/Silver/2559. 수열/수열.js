// 온도 수열에서, 연속적인 온도 합이 가장 큰 값
// 날짜수는 십만 이하임 주의
// 슬라이딩 윈도우인가 그거 같음

const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [날짜수, 연속날짜수] = input1.split(" ").map(Number);
const 온도arr = input2.split(" ").map(Number);

const solution = () => {
  // 구간합과 관련된 문제니까 우선 구간합 배열을 만들자
  const 구간합arr = Array.from({ length: 날짜수 + 1 }, () => 0); // 길이+1
  for (let i = 1; i <= 날짜수; i++) {
    구간합arr[i] = 구간합arr[i - 1] + 온도arr[i - 1];
  }
  // 특정 구간의 합은 구간합arr[K] - 구간합arr[K-연속날짜수]
  let max = -10000001;
  for (let i = 0; i <= 날짜수 - 연속날짜수; i++) {
    const new합 = 구간합arr[i + 연속날짜수] - 구간합arr[i];
    max = Math.max(max, new합);
  }
  return max;
};

console.log(solution());

// (0개~n개짜리) 부분수열의 합이 S가 되는 경우의 수 구하기
// dfs

const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [n, s] = input1.split(" ").map(Number);
const arr = input2.split(" ").map(Number);
let count = 0;
let sum = 0;

const dfs = (i) => {
  // i가 끝일 때 dfs 종료
  if (i === n) return;
  // 현재까지의 합이 s일때 개수 늘리기
  if (sum + arr[i] === s) count++;

  dfs(i + 1); // 이번꺼 포함 안하고 다음 호출

  sum += arr[i];
  dfs(i + 1); // 이번꺼 더하고 다음 호출
  sum -= arr[i];
};

const solution = () => {
  dfs(0);
  return count;
};

console.log(solution());

// - N개의 강의를 순서대로 블루레이에 담아야함
// - 모두 같은 크기의 M개의 블루레이에 N개의 강의를 모두 담기로함 (블루레이 개수는 최소한으로)
// - 가능한 블루레이 크기 중 최솟값

// > 블루레이 크기를 mid로, mid * M ≥ 총 강의 길이인지 체크, mid 이하의 동영상끼리 묶었을 때 묶음 수 ≤ M
// > 블루레이 크기 범위 : 강의길이 중 최대 ~ 10,000 * 100,000

const fs = require("fs");
const [input1, input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [강의개수, 블루레이개수] = input1.split(" ").map(Number);
const 각강의길이 = input2.split(" ").map(Number);

// 블루레이 크기가 mid일 때 강의녹화에 필요한 블루레이 개수
const checkCount = (mid) => {
  let count = 1;
  let sum = 0;
  for (let i = 0; i < 강의개수; i++) {
    if (sum + 각강의길이[i] > mid) {
      sum = 0;
      count++;
    }
    sum += 각강의길이[i];
  }
  return count;
};

const solution = () => {
  let l = Math.max(...각강의길이); // 일단 한 블루레이에 한 강의는 담겨야 하니까
  let r = 1000000000;
  let ans;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const res = checkCount(mid);
    if (res > 블루레이개수) {
      // 블루레이 크기를 늘려야 함
      l = mid + 1;
    } else {
      // 답은 될 수 있지만 크기를 줄여도 됨
      ans = mid;
      r = mid - 1;
    }
  }
  return ans;
};

console.log(solution());

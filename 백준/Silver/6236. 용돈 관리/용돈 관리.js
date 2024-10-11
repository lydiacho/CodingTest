// - N일 동안 사용할 금액을 K원씩 M번 통장에서 돈을 빼서 쓰기로 함.
// - 돈이 모자라지면 / 돈이 남아도 → 잔금 입금 후 다시 K원 인출
// - 인출 금액 K 최소화. 최소 금액 K 구하기

// ⇒ K씩 규칙대로 인출했을 때 인출 횟수가 M회 이하면 OK

// > 인출 금액을 mid로, 1 ~10000 * 100,000
// - 최소 : 매일 사용 금액 이상이어야 하니까 max(매일사용금액)
// - 최대 : 100,000일 10000원 필요해서 **100,000 * 10000**원씩 1번 인출

const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [기간, 인출횟수] = input1.split(" ").map(Number);
const 매일사용금액 = input2.map(Number);

const calCount = (mid) => {
  let count = 1;
  let sum = mid;

  for (let i = 0; i < 기간; i++) {
    if (매일사용금액[i] > sum) {
      sum = mid - 매일사용금액[i]; // 잔금 무시하고 다시 K값으로
      count++;
      continue;
    }
    sum -= 매일사용금액[i];
  }
  return count;
};
const solution = () => {
  let l = Math.max(...매일사용금액);
  let r = 1000000000;
  let ans;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const res = calCount(mid);
    if (res <= 인출횟수) {
      ans = mid;
      // 인출 횟수를 더 늘려도 되니 1회 인출값을 최소한으로 줄여봐야함
      r = mid - 1;
    } else {
      // 1회 인출값을 더 키워서 횟수를 줄여야함
      l = mid + 1;
    }
  }
  return ans;
};

console.log(solution());

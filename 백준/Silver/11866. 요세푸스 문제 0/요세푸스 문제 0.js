// N명의 사람이 원형으로 앉음.
// K번째 사람 제거 반복
// 모두 제거될 때까지 반복할 때, 제거되는 순서가 요세푸스 순열

const fs = require("fs");
const [n, k] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const solution = () => {
  const 요세푸스 = Array.from({ length: n }, (_, i) => i + 1);
  let index = 0;
  const answer = [];
  while (요세푸스.length > 0) {
    index = (index + k - 1) % 요세푸스.length;
    answer.push(요세푸스[index]);
    요세푸스.splice(index, 1);
  }
  return "<" + answer.join(", ") + ">";
};
console.log(solution());
// 1~N까지자연수 중 M개를 골라 수열 만들기
// 같은 수 중복 선택 가능. 수열은 "비내림차순" (a <= b ... )
// 수열은 사전 순으로 출력

const fs = require("fs");
const [n, m] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const solution = () => {
  const answer = [];
  const temp = Array.from({ length: m }, () => -1);
  const cal = (num, count) => {
    temp[count - 1] = num;

    if (count === m) {
      answer.push(temp.join(" "));
      return;
    }

    for (let j = num; j <= n; j++) {
      cal(j, count + 1);
    }
  };
  for (let i = 1; i <= n; i++) {
    cal(i, 1);
  }
  return answer.join("\n");
};

console.log(solution());
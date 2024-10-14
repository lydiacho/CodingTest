// 괄호 문자열이 올바른지 판단해서 YES / NO

const fs = require("fs");
const [T, ...rest] = fs.readFileSync(0).toString().trim().split("\n");

let t = +T;

const cal = (input) => {
  let stackCount = 0;
  if (input[0] === ")") {
    return "NO";
  }
  for (let i = 0; i < input.length; i++) {
    if (stackCount < 0) {
      return "NO";
    }
    if (input[i] === "(") stackCount++;
    else stackCount--;
  }

  if (stackCount === 0) return "YES";
  else return "NO";
};
const solution = () => {
  const answer = [];
  rest.map((v) => {
    answer.push(cal(v));
  });
  return answer.join("\n");
};

console.log(solution());

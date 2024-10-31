// 문자열에 폭발문자열이 포함 -> 모든 폭발 문자열 폭발 -> 남은 문자열만 다시 붙음
// 새로 만들어진 문자열에 폭발 문자열이 다시 생길 수 있음 (폭발 문자열 없을때까지 계속)
// 마지막에 남은 문자열 or 없으면 "FRULA"
const fs = require("fs");
const [문자열, 폭발] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const solution = () => {
  // 문자열 길이가 매우 길기 때문에, 일반 split으로는 불가능
  // 각 문자를 스택에 넣어주고 스택 위에 폭발 문자열이 발견되면 바로 Pop
  const 폭발길이 = 폭발.length;
  const stack = [];
  for (let i = 0; i < 문자열.length; i++) {
    stack.push(문자열[i]);
    if (stack.slice(-폭발길이).join("") === 폭발) {
      for (let j = 0; j < 폭발길이; j++) {
        stack.pop();
      }
    }
  }
  return stack.length > 0 ? stack.join("") : "FRULA";
};

console.log(solution());

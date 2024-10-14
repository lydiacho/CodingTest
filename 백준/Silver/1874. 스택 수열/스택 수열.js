// 1~n을 스택에 넣었다가 빼서 수열 만들기
// 스택에 push하는 순서는 오름차순
// 수열이 주어졌을 때 어떤 순서로 만들어진건지 구하기
// sol :
// 첫번째 수까지 쭉 push
// 첫번째 수 pop 후, 다음수와 스택 top이 동일하면 pop, 아니면 push
const fs = require("fs");
const [n, ...arr] = fs.readFileSync(0).toString().trim().split("\n");
const numbers = arr.map(Number);

const solution = () => {
  const stack = [];
  const answer = [];
  let num = 1;
  // 첫번째 수까지 push
  while (num <= arr[0]) {
    stack.push(num);
    answer.push("+");
    num++;
  }
  // 첫번째 수 pop
  stack.pop();
  answer.push("-");

  for (let i = 1; i < n; i++) {
    const top = stack[stack.length - 1];
    if (numbers[i] === top) {
      stack.pop();
      answer.push("-");
      continue;
    }
    if (!top || (top < numbers[i] && num <= n)) {
      while (num <= numbers[i]) {
        stack.push(num);
        answer.push("+");
        num++;
      }
      stack.pop();
      answer.push("-");
    } else {
      return "NO";
    }
  }

  return answer.join("\n");
};

console.log(solution());

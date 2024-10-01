const fs = require("fs");
const [n, ...input] = fs.readFileSync(0).toString().trim().split("\n");

function solution(N, input) {
  let answer = '(';
  // input이 모두 0이거나 모두 1인지 체크 
  if(!input.some(v=>v!==input[0])) {  // 모든 줄이 동일할 때 
    if (input[0] === '0'.repeat(N)) return '0';
    if (input[0] === '1'.repeat(N)) return '1';
  }
  answer += solution(N/2, input.map(v=>v.slice(0,N/2)).slice(0,N/2)); // 왼쪽 위
  answer += solution(N/2, input.map(v=>v.slice(N/2)).slice(0,N/2)); // 오른쪽 위
  answer += solution(N/2, input.map(v=>v.slice(0,N/2)).slice(N/2)); // 왼쪽 아래
  answer += solution(N/2, input.map(v=>v.slice(N/2)).slice(N/2)); // 오른쪽 아래
  return answer + ')';
}

console.log(solution(n, input))
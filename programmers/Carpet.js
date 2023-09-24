/* 고민로직
- yellow = (가로-2)*(세로-2) = 가로*세로 - 2*가로 - 2*세로 + 4 >= 1
- brown = (가로+세로-2)*2 = 2*가로 + 2*세로 - 4 >= 8
- 가로*세로 = brown + yellow
- 가로+세로 = (brown + 4) / 2
- 세로 = (brown + 4) / 2 - 가로 
- 가로 >= 세로
- 가로 >= 3, 세로 >= 3
*/
function solution(brown, yellow) {
  var answer = [];

  let sum = brown + yellow;
  for (let i = 3; i <= Math.floor(Math.sqrt(sum)); i++) {
    if (sum % i !== 0) continue;
    if (sum / i + i !== (brown + 4) / 2) continue;
    answer = [sum / i, i];
  }
  return answer;
}

console.log(solution(8, 1));

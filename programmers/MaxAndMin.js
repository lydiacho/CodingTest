/* 문제설명
문자열 s에는 공백으로 구분된 숫자들이 저장되어 있습니다. str에 나타나는 숫자 중 최소값과 최대값을 찾아 이를 "(최소값) (최대값)"형태의 문자열을 반환하는 함수, solution을 완성하세요.
예를들어 s가 "1 2 3 4"라면 "1 4"를 리턴하고, "-1 -2 -3 -4"라면 "-4 -1"을 리턴하면 됩니다.
*/

/* 고민로직
1. 각 문자를 순회하며 공백을 제외한 나머지 글자를 int로 변환 후 배열에 추가하기 
2. Math.max(), Math.min() 함수로 최댓값과 최솟값 구하기 
3. 리턴 문자열 완성
*/

// Point : Math.max()와 Math.min() 메소드의 인수는 숫자의 배열이 아니라 여려개의 숫자들이어야 한다. 따라서 인수로 배열을 넣으면 리턴값이 NaN이 되므로 스프레드연사자를 통해 배열의 형태를 풀어줘야 한다.

// 1차시도
// 틀린 이유 : 음수일 경우 숫자가 한글자가 아닌 두글자로 이루어져 게속 NaN이 나오는 문제에 봉착했었다.
// function solution(s) {
//   var answer = "";
//   let array = [];
//   for (let i = 0; i < s.length; i += 2) {
//     array.push(parseInt(s[i]));
//   }
//   console.log(array);
//   answer += Math.min(...array).toString() + " " + Math.max(...array).toString();
//   return answer;
// }

function solution(s) {
  var answer = "";
  let array = s.split(" ").map((el) => parseInt(el));
  answer += Math.min(...array) + " " + Math.max(...array);
  return answer;
}

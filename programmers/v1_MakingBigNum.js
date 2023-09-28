/*
어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.
예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 이 중 가장 큰 숫자는 94 입니다.
문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. 
number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.
*/

/*
- 각 숫자를 내림차순으로 정렬한 배열 arr
- arr 앞에서부터 순회하면서 
- 현재 숫자의 number index가 다음 숫자의 number index보다 작으면 answer에 추가  
*/

// 주의!! forEach는 빠른 return이 안된다..!

// 오답
// function solution(number, k) {
//   let answer = "";
//   const arr = [];
//   for (num of number) {
//     arr.push(num);
//   }
//   arr.sort((a, b) => b - a);
//   for (let i = 0; i < arr.length; i++) {
//     if (answer.length === number.length - k) {
//       return answer;
//     }
//     if (arr[i] === arr[i + 1]) answer += arr[i];
//     else if (number.indexOf(arr[i]) < number.indexOf(arr[i + 1]))
//       answer += arr[i];
//   }
//   answer += number[number.length - 1];
//   return answer;
// }

function solution(number, k) {
  let stack = [];

  let arr = number.split("").reverse();

  while (arr.length && k > 0) {
    stack.push(arr.pop());
    while (stack[stack.length - 1] < arr[arr.length - 1] && k > 0) {
      stack.pop();
      k = k - 1;
    }
  }

  if (k !== 0) stack = stack.slice(0, -k);

  return stack.join("") + arr.reverse().join("");
}

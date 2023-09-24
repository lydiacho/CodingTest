/*
한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.
각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 
종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.
*/

/* 소수 판별법 
- 2부터 숫자의제곱근까지 돌면서 나눌 수 있는 수가 있는지 체크한다 
*/

/* 고민 로직
- numbers 문자열이 빌 때까지 반복 
- numbers 모든 문자를 순회하
*/

function solution(numbers) {
  var answer = 0;

  let arr = new Array(numbers.length);

  arr.forEach((el,idx)=>{
    numbers.forEach((num,numIdx)=>{
      arr[idx] = num
    })
    
  })

  // 만들 수 있는 조합의 종류 : numbers.length!

  const N = numbers.length;

  numbers.forEach((el, idx)=>{
    numbers.splice(idx,1) // 첫번째에 들어간 수 지우기 
    numbers.

  })

  let str = "";
  while () {
    numbers.forEach((el,idx)=>{
      str+=el;
      const newStr = [...numbers];
      newStr.splice(idx,1);
    })
  }

  return answer;
}

// 보류..dfs 공부하고 와서 다시 풀어보자 
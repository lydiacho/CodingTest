// 문제요약 : 여러 개의 정수를 이어붙여서 만들 수 있는 수 중 가장 큰 수를 '문자열'로 바꿔서 반환
/* 고민로직 : 
- 무조건 앞자리에 더 큰 수가 와야함 (가장 큰 수는, 숫자 기준이 아닌 유니코드 기준. 30과 9 중 9가 먼저오도록) -> .sort().reverse()
*/
/* 주의 : 
- 3이 30보다 작게 정렬되는데, 303보다 330이 더 큰 문제. 
- 각자 자리 비교해서 큰거 무조건 앞, 
- 그다음자리 비교할 때 앞자리가 동일하고 현재자리에선 하나가 undefined일 경우, a[이전 자리]와 b[현재 자리]를 비교해서 정렬한다  
3 30 31 32 33 34 35 
*/

/* 두 수를 비교할 때 
- 자릿수가 같은 경우 (양쪽다 동시에 undefined) : 처음부터 숫자 내림차순으로 정렬 
- 자릿수가 다른 경우, 각 자리를 순회하며 
  - 현재 수가 둘이 다른 경우 : 현재 수 크기 비교하여 정렬 
  - 현재 수가 둘이 같은 경우 : continue
  - 한쪽(a)만 undefined : return b[현재자리] - a[이전자리]
*/
// 실패 case
// function compare(a, b) {
//   let a_st = a.toString();
//   let b_st = b.toString();

//   if (a_st.length === b_st.length) {
//     return b - a;
//   }
//   for (let i = 0; i < 4; i++) {
//     if (a_st[i] === b_st[i]) continue;
//     if (a_st[i] === undefined) return +b_st[i] - +a_st[i - 1];
//     if (b_st[i] === undefined) return +b_st[i - 1] - +a_st[i];
//     return +b_st[i] - +a_st[i];
//   }
// }

function compare(a, b) {
  let a_st = a.toString();
  let b_st = b.toString();

  if (a_st.length === b_st.length) {
    return b - a;
  }
  return Number(b_st + a_st) - Number(a_st + b_st);
}

function solution(numbers) {
  var answer = "";
  numbers.sort(compare);
  if (numbers[0] === 0) return "0";
  numbers.forEach((num) => {
    answer += num;
  });
  return answer;
}

/* 주의 :
- answer는 11번 테케만 틀리는데, 11번 해결을 위해 Number(answer).toString()을 하면 다른 테케도 왕창 틀리는 문제 
- 출력해보니 숫자가 너무 커질 경우 변환 과정에서 '과학적 표기법'으로 바뀜 
-> 숫자 변환을 거쳐야하는 케이스는 0인 경우밖에 없고, 내림차순 정렬 시 [0]이 0이라는 것은 뒤에가 다 0이라는 것이므로 해당 경우는 "0"을 바로 리턴해버린다 
*/

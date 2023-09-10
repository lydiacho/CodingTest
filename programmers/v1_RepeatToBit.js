/*
0과 1로 이루어진 어떤 문자열 x에 대한 이진 변환을 다음과 같이 정의합니다.
x의 모든 0을 제거합니다.
x의 길이를 c라고 하면, x를 "c를 2진법으로 표현한 문자열"로 바꿉니다.
예를 들어, x = "0111010"이라면, x에 이진 변환을 가하면 x = "0111010" -> "1111" -> "100" 이 됩니다.
0과 1로 이루어진 문자열 s가 매개변수로 주어집니다. s가 "1"이 될 때까지 계속해서 s에 이진 변환을 가했을 때, 
이진 변환의 횟수와 변환 과정에서 제거된 모든 0의 개수를 각각 배열에 담아 return 하도록 solution 함수를 완성해주세요.
*/

/* 고민로직 : 
반복문 (1이 될때까지) {
- s의 모든 0 제거하기 (0개수 count)
- s의 길이 c 구하기 (c는 정수)
- c를 이진법으로 변환(문자열로)
  - 반복문(c가 0이 될 때까지) { str의 앞에 c % 2 추가 -> Math.floor(c/2) }
- count 한 번 추가 
}
*/

function solution(s) {
  let c = 0;
  let count = 0;
  let zeroCnt = 0;
  let str = s;

  do {
    while (str.includes("0")) {
      str = str.replace("0", "");
      zeroCnt++;
    }
    c = str.length;
    str = "";
    while (c !== 0) {
      str += (c % 2).toString();
      c = Math.floor(c / 2);
    }
    count++;
  } while (str !== "1");

  return [count, zeroCnt];
}

/* 새로 학습한 내용 : 
< 문자열을 정수로 변환하는 법> 
- Number(s)
- parseInt(s, 진수)
- parseFloat(s)
- +s
- s * 1
- s / 1
- s - 0
- Math.floor(s) (버려서 정수로)
- Math.ceil(s) (올려서 정수로)
- Math.round(s) (반올림해서 정수로)

< 문자열 특정 요소 찾아서 삭제 > 
- s.replace('0','');
*/

/* 베스트 답안 : 
function solution(s) {
    var answer = [0,0];
    while(s.length > 1) {
        answer[0]++;
        answer[1] += (s.match(/0/g)||[]).length;
        s = s.replace(/0/g, '').length.toString(2);
    }
    return answer;
}
*/

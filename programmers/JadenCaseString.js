/*
JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 
단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.
*/

// 조건 : 숫자는 단어의 첫 문자로만, 공백 문자 연속 가능

/* 고민로직 :
0. ' '구분자로 split해서 각 단어를 변환하면, 공백이 연속으로 나오는 경우를 챙기지 못한다. 
1. s의 첫글자부터 각 글자를 순회
2. flag 변수 하나를 관리. 초기값은 true. 
3. 공백글자를 만나면 flag는 true. 첫글자를 대문자로 변환한 후에 flag 값을 false로 update. 
4. flag가 true면 알파벳 조건 체크 후, 글자를 대문자로 변환, flag가 false면 소문자로 변환 
이렇게 하면 연속 공백도 유지하면서 변환 가능 
*/

// 실패 :
// C언어에서는 알파벳, 정수 간의 연산을 통해 아스키코드를 활용할 수 있다. ex- 'A' + 32 -> 'a' 가 가능하다.
// 하지만 JS에서는 알파벳간의 연산 및 아스키코드 활용이 불가하다. 'A'-'a'를 계산하니 32가 아닌 NaN이 나왔다.
// C언어에서는 대소문자 변환을 위와같은 아스키코드를 활용하지만, JS에서는 문자열 메소드 .toUpperCase(), .toLowerCase()를 사용해야 했다!

// function solution(s) {
//   var answer = "";
//   let flag = true;
//   const ASCII = "a" - "A";

//   for (let i = 0; i < s.length; i++) {
//     if (flag) {
//       if ("a" <= s[i] && s[i] <= "z") {
//         answer += s[i] - ASCII;
//       }
//       flag = false;
//       continue;
//     }

//     if (s[i] === " ") {
//       answer += s[i];
//       flag = true;
//       continue;
//     }

//     if ("A" <= s[i] && s[i] <= "Z") {
//       answer += s[i] + ASCII;
//     }

//     answer += s[i];
//   }

//   return answer;
// }

/* 고민로직2 : 
1. 문자가 공백이면 -> 그대로 추가, flag = true;
2. flag가 true면 -> 
2-1. 첫글자가 소문자면 -> 대문자로 변환 후 추가, flag = false;
2-2. 첫글자가 대문자거나 숫자면 -> 그대로 추가, flag = false;
3. flag가 false면 -> 
3-1. 대문자면 -> 소문자로 변환 후 추가
3-2. 소문자면 -> 그대로 추가 
*/

function solution(s) {
  var answer = "";
  let flag = true;
  let alpha;

  for (let i = 0; i < s.length; i++) {
    alpha = s[i];

    //1.
    if (s[i] === " ") {
      answer += alpha;
      flag = true;
      continue;
    }

    //2.
    if (flag) {
      if ("a" <= s[i] && s[i] <= "z") {
        alpha = s[i].toUpperCase();
      }
      flag = false;
    }

    //3.
    else if ("A" <= s[i] && s[i] <= "Z") {
      alpha = s[i].toLowerCase();
    }

    answer += alpha;
  }

  return answer;
}

/* 베스트답안
function solution(s) {
    return s.split(" ").map(v => v.charAt(0).toUpperCase() + v.substring(1).toLowerCase()).join(" ");
}
- .split(" ") : 공백 구분자로 분리하고, 공백이 연속으로 나올 경우 그 사이는 빈 문자열로 반환된다.
- .charAt(index) : 문자열의 특정 인덱스의 글자를 반환한다. 여기서 주목할 점은, 실제 문자열보다 큰 인덱스에 접근할 경우 오류가 나지 않고 빈 문자열을 반환한다. 따라서 연속 공백에 의해 생기는 빈 문자열도 오류 없이 처리할 수 있는 메소드이다. (일반적인 인덱스 접근 방식 s[0]은 에러남)
- .toUpperCase(), .toLowerCase() : 문자열 전체를 대문자/소문자로 변환해준다 
- .substring(시작인덱스[,끝인덱스]) ; 문자열에서 시작인덱스~끝인덱스 전 까지의 부분 문자열을 반환한다. 
- .join(s) : split의 반대메소드. 구분자를 사이마다 추가하여 배열을 문자열로 합쳐준다. (디폴트는 콤마(,))

- 베스트답안의 로직 :
문자열을 공백으로 분리 -> 각 단어요소에 대해 -> 첫글자는 무조건 대문자로, 첫글자 제외한 글자들은 소문자로 -> 변환한 단어요소들을 공백을 추가하여 다시 합치기 
*/

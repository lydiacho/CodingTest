function solution(sizes) {
  var answer = 0;

  // 각 요소의 첫째, 두번째 중 더 큰거는 a 배열에push
  // 나머지를 b 배열에 push
  // a의 최댓값 x b의 최댓값

  let big = [];
  let small = [];

  sizes.forEach((el) => {
    if (el[0] >= el[1]) {
      big.push(ael[0]);
      small.push(el[1]);
    } else {
      big.push(el[1]);
      small.push(el[0]);
    }
  });

  answer = Math.max(...big) * Math.max(...small);

  return answer;
}

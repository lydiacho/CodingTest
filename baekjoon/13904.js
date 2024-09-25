// 하루에 과제 1개. 마감일이 지난 과제는 점수 X. 가장 점수를 많이 받을 수 있도록 과제 수행.
// input : 과제마감일까지 남은 일수 d(1~1000), 과제 점수 w(1~100)
// output : 점수 최댓값

// 과제마감일이 가장 조금 남은 과제부터 + 과제마감일이 같은 경우 점수가 큰 과제부터 -> X 실패.
// 가장 높은 점수를 가장 늦게 할 수 있는 날로 고정

// ⭐️ 위의 문제풀이 아이디어를 떠올리는게 핵심.

const fs = require("fs");
const [n, ...arr] = fs.readFileSync(0).toString().trim().split("\n");
const work = arr.map((v) => v.split(" ").map((w) => +w));

const solution = (n, work) => {
  const days = new Array(+n).fill(0);

  //우선순위 : work 순회하면서 w의 내림차순 -> d의 오름차순으로 정렬.
  work.sort(([ad, aw], [bd, bw]) => {
    if (bw === aw) {
      return ad - bd;
    }
    return bw - aw;
  });

  work.forEach(([d, w]) => {
    // 만약 마지막날에 이미 더 큰 점수가 차있으면 일자 당겨서 저장
    for (let i = d; i > 0; i--) {
      if (days[i] > 0) continue;
      days[i] = w;
      break;
    }
  });

  return days.reduce((acc, curr) => acc + curr, 0);
};

console.log(solution(n, work));

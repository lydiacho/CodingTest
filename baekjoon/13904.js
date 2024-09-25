// 하루에 과제 1개. 마감일이 지난 과제는 점수 X. 가장 점수를 많이 받을 수 있도록 과제 수행.
// input : 과제마감일까지 남은 일수 d(1~1000), 과제 점수 w(1~100)
// output : 점수 최댓값

// 과제마감일이 가장 조금 남은 과제부터 + 과제마감일이 같은 경우 점수가 큰 과제부터 -> X 실패.

const fs = require("fs");
const [_, ...arr] = fs.readFileSync(0).toString().trim().split("\n");
const work = arr.map((v) => v.split(" ").map((w) => +w));

const solution = (work) => {
  let score = 0;

  //work 순회하면서 d의 오름차순 -> w의 내림차순으로 정렬.
  work.sort(([ad, aw], [bd, bw]) => {
    if (ad === bd) {
      return bw - aw;
    }
    return ad - bd;
  });
  console.log(work);
  let pass = 0;
  work.forEach(([d, w]) => {
    if (pass === d) return;
    score += w;
    pass++;
    console.log(pass, score);
  });
  return score;
};

console.log(solution(work));

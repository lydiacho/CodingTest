// 경주 코스 길이 : 4~12km
// 팀당 6명, 상위 네명이 점수를 합산하여 계산
// 결승선 통과하는 순으로 점수 받음 (자격 없는 팀은 점수 부여 X)
// 가장 낮은 점수 팀이 우승
// 동점일 경우 다섯번째 주자 점수 비교
const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
let T = +input1;

const solution = () => {
  const answer = [];
  while (T--) {
    const [in1, in2] = rest.splice(0, 2);
    const N = +in1;
    const record = in2.split(" ").map(Number);

    // 선수 카운트
    const teamCount = Math.max(...record);
    const teamCountArr = Array.from({ length: teamCount + 1 }, () => 0);

    record.forEach((player) => {
      teamCountArr[player]++;
    });

    const badTeam = new Set();
    teamCountArr.forEach((v, idx) => {
      if (v < 6 && idx !== 0) {
        badTeam.add(idx);
      }
    });

    // record를 순회하면서 badTeam이 아닐 경우, { 팀의 완주자 수, 합산 점수, 다섯번째 완주자 점수 } 저장하기
    const recordList = Array.from({ length: teamCount + 1 }, () => ({
      idx: -1,
      count: 0,
      score: 0,
      fifth: -1,
    }));

    let 등수 = 1;
    for (let i = 0; i < N; i++) {
      const teamNum = record[i];
      if (badTeam.has(teamNum)) continue;
      recordList[teamNum].idx = teamNum;
      recordList[teamNum].count++;
      if (recordList[teamNum].count === 5) {
        recordList[teamNum].fifth = 등수;
      }
      if (recordList[teamNum].count <= 4) {
        recordList[teamNum].score += 등수;
      }
      등수++;
    }

    // recordList를 score 오름차순으로 정렬
    recordList.sort((a, b) => {
      if (a.score === b.score) {
        return a.fifth - b.fifth;
      }
      return a.score - b.score;
    });

    answer.push(recordList.filter((v) => v.idx !== -1)[0].idx);
  }

  return answer.join("\n");
};

console.log(solution());

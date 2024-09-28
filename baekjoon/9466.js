// 모든 학생이 같이 팀하고 싶은 학생 한명을 선택함 (자신 선택 가능)
// 한 사이클 -> 한 팀
// input : 테케 수 t, 학생 수 n (2~100,000), 1~n번 학생이 선택한 학생의 번호
// output: 팀에 속하지 못한 학생 수

const fs = require("fs");
const [T, ...rest] = fs.readFileSync(0).toString().trim().split("\n");
let t = +T;

while (t--) {
  const n = +rest.splice(0, 1)[0];
  const arr = [
    0,
    ...rest
      .splice(0, 1)[0]
      .split(" ")
      .map((v) => +v),
  ];

  // 싸이클에 속했는지 여부 판단 -> DFS를 하다가 자기 자신으로 돌아오면 거기에 속한 모든 노드 제외
  const isCycled = new Array(n + 1).fill(false);
  const visited = new Array(n + 1).fill(false);
  const finished = new Array(n + 1).fill(false);

  const dfs = (idx) => {
    // 아직 방문하지 않은 노드
    if (!visited[idx]) {
      visited[idx] = true;
      dfs(arr[idx]);
      finished[idx] = true;
      return;
    }
    // 방문완료 + 검사종료 : pass
    if (finished[idx]) {
      return;
    }
    // 방문완료 + 검사종료X : cycle 발생 -> 사이클에 포함된 모든 노드 기록
    let i = idx;
    while (!isCycled[i]) {
      isCycled[i] = true;
      i = arr[i];
    }
  };

  const solution = () => {
    // 싸이클에 속하지 못한 노드 수 구하기
    for (let i = 1; i < n + 1; i++) {
      if (!visited[i]) {
        dfs(i);
      }
    }

    return isCycled.filter((v) => !v).length - 1;
  };
  console.log(solution());
}

// "가장 짧은 변환 과정" => BFS
// 탐색 과정 : words에서 hit과 비교했을 때 한글자 다른 후보지를 queue에 push
// while 종료 조건 : 변환한 단어가 target과 동일해졌을 때

function solution(begin, target, words) {
  const n = begin.length;
  const visited = [];

  function BFS() {
    const q = [];
    q.push([begin, 0]);
    visited.push(begin);

    while (q.length) {
      const [word, count] = q.shift();

      // target word가 되면 종료
      if (word === target) {
        return count;
      }

      // words 배열을 돌면서 word와 한글자만 차이나는 단어들 push
      words.forEach((w) => {
        if (visited.includes(w)) return;
        let diffCount = 0;
        for (let i = 0; i < n; i++) {
          if (w[i] !== word[i]) {
            diffCount++;
          }
        }
        if (diffCount !== 1) return;
        q.push([w, count + 1]);
        visited.push(w);
      });
    }

    return 0;
  }

  return BFS();
}

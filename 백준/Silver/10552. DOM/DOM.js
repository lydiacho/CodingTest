const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [사람수, 채널수, 현재채널] = input1.split(" ").map(Number);
const 채널취향 = rest.map((v) => v.split(" ").map(Number)); // 나이 오름차순으로 정렬

const solution = () => {
  const 싫to좋 = Array.from({ length: 채널수 + 1 }, () => 0);
  채널취향.forEach(([좋, 싫]) => {
    if (싫to좋[싫] !== 0) return;
    싫to좋[싫] = 좋; // 제일 어린 사람만 저장
  });
  const visited = Array.from({ length: 채널수 + 1 }, () => false);

  const q = [];
  let head = 0;

  q.push(현재채널);
  visited[현재채널] = true;

  let count = 0;
  while (q.length > head) {
    const curr = q[head++];

    if (싫to좋[curr] === 0) return count; // 현재 채널을 싫어하는 사람이 없을 때
    const next = 싫to좋[curr]; // 현재 채널을 싫어하는 사람이 바꾼 채널
    if (visited[next]) break;
    q.push(next);
    visited[next] = true;
    count++;
  }

  return -1;
};

console.log(solution());

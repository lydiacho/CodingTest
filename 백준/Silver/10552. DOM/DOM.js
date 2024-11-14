const fs = require("fs");
const [input1, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [사람수, 채널수, 현재채널] = input1.split(" ").map(Number);
const 채널취향 = rest.map((v) => v.split(" ").map(Number)); // 나이 오름차순으로 정렬

const solution = () => {
  const 싫to좋 = Array.from({ length: 채널수 + 1 }, () => []);
  채널취향.forEach(([좋, 싫]) => {
    싫to좋[싫].push(좋);
  });
  const visited = Array.from({ length: 채널수 + 1 }, () => false);

  const q = [];
  let head = 0;

  q.push(현재채널);
  visited[현재채널] = true;

  let count = 0;
  while (q.length > head) {
    const curr = q[head++];

    if (싫to좋[curr].length === 0) return count;
    const next = 싫to좋[curr][0]; // 제일 어린 사람
    if (visited[next]) break;
    q.push(next);
    visited[next] = true;
    count++;
  }

  return -1;
};

console.log(solution());

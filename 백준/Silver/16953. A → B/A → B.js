const fs = require("fs");
const [A, B] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const solution = () => {
  const q = [];
  let head = 0;
  q.push(A);

  let count = 1;
  while (q.length > head) {
    let size = q.length - head;
    for (let i = 0; i < size; i++) {
      const curr = q[head++];
      if (curr === B) return count;
      if (curr > B) continue;

      q.push(curr * 2);
      q.push(curr * 10 + 1);
    }
    count++;
  }
  return -1;
};

console.log(solution());

const fs = require("fs");
const [RC, ...rest] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [R, C] = RC.split(" ").map(Number);

const solution = () => {
  // 고슴도치 큐, 물 큐 생성
  const 도치큐 = [];
  const 물큐 = [];
  let [도치head, 물head] = [0, 0];

  // 두 지점, 방문배열 생성
  const visited = rest.map((v, x)=>v.split("").map((w, y) => {
      if (w === "X") return 1;
      if (w === "D") {
        return 2;
      }
      if (w === "*") {
        물큐.push([x, y]);
        return 1;
      }
      if (w === "S") {
        도치큐.push([x, y]);
        return 1;
      }
      return 0;
    })
  );
  // dir 배열 생성
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // 시간 count
  let count = 0;
  
  // 도치 이동 
  while (도치큐.length > 도치head || 물큐.length > 물head) {
    // 물 먼저 퍼뜨리기
    let 물큐size = 물큐.length-물head; //🧨 head를 빼줘야 함 
    for (let i = 0; i < 물큐size; i++) {
      const [x, y] = 물큐[물head];
      물head++;
      dir.map(([dx, dy]) => {
        const [newx, newy] = [x + dx, y + dy];
        if (newx < 0 || newx >= R || newy < 0 || newy >= C || visited[newx][newy]) return;
        물큐.push([newx, newy]);
        visited[newx][newy] = 1;
      });
    }

    let 도치큐size = 도치큐.length-도치head; //🧨 head를 빼줘야 함 
    for (let i = 0; i < 도치큐size; i++) {
      const [x, y] = 도치큐[도치head]; 
      도치head++;
      
      for (let i = 0; i < 4; i++) {  //🧨 빠른 리턴을 위해 map이 아닌 for문 사용
        const [newx, newy] = [x + dir[i][0], y + dir[i][1]];
        if (newx < 0 || newx >= R || newy < 0 || newy >= C || visited[newx][newy] === 1) continue;
        if (visited[newx][newy] === 2) return count + 1;
        도치큐.push([newx, newy]); 
        visited[newx][newy] = 1;
      }
    }
    count++;
  }
  return "KAKTUS";
  
};

console.log(solution());

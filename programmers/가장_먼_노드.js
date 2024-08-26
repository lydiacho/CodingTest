function solution(n, edge) {
  const q = [];
  const arr = Array.from({ length: n + 1 }, () => []);
  const visited = Array.from({ length: n + 1 }, () => 0);
  // edge를 사용한 인접 리스트 만들기
  edge.forEach(([v1, v2]) => {
    arr[v1].push(v2);
    arr[v2].push(v1);
  });

  // 1번부터 출발
  q.push([1, 1]);
  visited[1] = 1;

  while (q.length > 0) {
    const [idx, count] = q.shift();
    arr[idx].forEach((v) => {
      if (visited[v] === 0) {
        q.push([v, count + 1]);
        visited[v] = count + 1;
      }
    });
  }

  const max = Math.max(...visited);

  return visited.filter((v) => v === max).length;
}

function solution(k, dungeons) {
  var answer = -1;
  const 던전_방문여부 = new Array(dungeons.length).fill(false);

  function dfs(현재_피로도, dungeons, 방문_수) {
    answer = Math.max(answer, 방문_수); 
    dungeons.forEach((v, i) => {
      if (!던전_방문여부[i] && 현재_피로도 >= v[0]) {
        던전_방문여부[i] = true;
        dfs(현재_피로도 - v[1], dungeons, 방문_수+1);
        던전_방문여부[i] = false;
      }
    })
  }

  dfs(k, dungeons, 0)
    
  return answer;
}
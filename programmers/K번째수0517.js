// array[i-1]부터 array[j-1]번째까지 자르고 정렬했을 때 K번째 수 구하기 
const solution = (array, commands) => commands.map(([i,j,k])=>array.slice(i-1,j).sort((a,b)=>a-b)[k-1]);
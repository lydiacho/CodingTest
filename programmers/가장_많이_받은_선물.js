function solution(friends, gifts) {
  let N = friends.length;
  const arr = new Array(N).fill().map(_=> new Array(N).fill(0));

  gifts.forEach((gift)=>{
    const [A,B] = gift.split(' ');
    const [idxA, idxB] = [friends.indexOf(A), friends.indexOf(B)];
    arr[idxA][idxB]++;
  })

  // 선물 지수 구하기 
  const giftNum = new Array(N);
  let n = N;
  while(n--) {
    giftNum[n] = arr[n].reduce((acc,curr)=>acc+=curr,0) - arr.reduce((acc,curr)=>acc+=curr[n],0);
  }

  // 가질 선물 수 구하기 
  const howMany = new Array(N).fill(0);
  let m = N;
  while(m--) {
    // N이 몇개 받을지? 
    for (let i = 0; i<N; i++) {
      if (i===m) continue;
      if (arr[m][i] > arr[i][m]) howMany[m]++; 
      else if (arr[m][i]===arr[i][m] && giftNum[m]>giftNum[i]) howMany[m]++; 
    }
  }

  return Math.max(...howMany);
}
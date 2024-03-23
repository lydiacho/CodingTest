function solution(brown, yellow) {
  const 가로세로_곱 = brown + yellow;
  for (let 세로 = 3; 세로 <= Math.sqrt(가로세로_곱); 세로++) {
    const 가로 = 가로세로_곱 / 세로;
    if (가로세로_곱 % 세로 === 0 && ((가로 + 세로) * 2 - 4) === brown) return [가로, 세로];
  }
}
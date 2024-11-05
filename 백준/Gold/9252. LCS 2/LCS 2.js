// Longest Comon Subsequence : 두수열의 공통 부분 수열 중 가장 긴 것
// 주의) 부분 수열은 연속된 문자로 구성될 필요 없음. 순차적이기만 하면 됨
// LCS의 길이와 LCS 문자열을 출력하는 문제
// 길이가 0인 경우는 둘째줄은 출력하지 않음
// 앞에 글자로부터 만들 수 있는 LCS를 만들어보고, 또 두번째로 만들 수 있는...

const fs = require("fs");
const [str1, str2] = fs.readFileSync(0).toString().trim().split("\n");

const solution = () => {
  // i자리, j자리 까지의 LCS 길이
  const dp = Array.from({ length: str1.length + 1 }, () =>
    Array.from({ length: str2.length + 1 }, () => [0, ""])
  );

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        const [count, str] = dp[i - 1][j - 1];
        dp[i][j] = [count + 1, str + str1[i - 1]];
      } else {
        if (dp[i - 1][j][0] > dp[i][j - 1][0]) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = dp[i][j - 1];
        }
      }
    }
  }

  return dp[str1.length][str2.length].join("\n");
};

console.log(solution());

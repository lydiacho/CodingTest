// 총 N마리 폰켓몬 중 N/2마리 가져올 때, 최대한 다양하게 데려오는 가짓수
// 총 종류 수를 구하고, 이게 N/2보다 작으면 무조건 그게 답. 크다면 N/2가 답.
function solution(nums) {
    const s = new Set(nums)
    if (s.size < nums.length / 2) {
        return s.size
    }
    return Math.floor(nums.length / 2)
}
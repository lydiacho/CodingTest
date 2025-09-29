// 모든 명함을 담을 수 있는 가장 작은 지갑 구하기 
function solution(sizes) {
    const sortedSizes = sizes.map((size)=>size.sort((a,b)=>a-b))
    const maxLength = Math.max(...sortedSizes.map(size=>size[0]))
    const maxLength2 = Math.max(...sortedSizes.map(size=>size[1]))
    return maxLength * maxLength2
}
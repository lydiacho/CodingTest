// 3, 31 -> 331, 313
// 5, 56 -> 556, 565
function solution(numbers) {
    const answer = numbers.sort((a,b)=>{
        return (+`${b}${a}`) - (+`${a}${b}`)
    }).join('')
    return answer[0] === "0" ? "0" : answer
}
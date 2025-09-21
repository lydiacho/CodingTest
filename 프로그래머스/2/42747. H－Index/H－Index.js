// 논문 인용 횟수 h번 이상 인용이 h편 이상 
function solution(citations) {
    citations.sort((a,b)=>b-a)
    for (let i = 0; i <= citations.length - 1; i++) {
        if (citations[i] < i+1) {
            return i
        }
    }
    return citations.length
}
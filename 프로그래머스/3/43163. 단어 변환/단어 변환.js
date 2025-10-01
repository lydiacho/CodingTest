// begin이 target이 되는 최소 단계 수. 변환 불가면 0 반환 
// 변환 가능한 케이스 : words에서 한글자만 다를 때 
function solution(begin, target, words) {
    const visited = Array.from({length: words.length}).fill(false)
    const q = [begin]
    let head = 0;
    let count = 0;
    
    while(q.length > head) {
        const qSize = q.length - head
        for (let i = 0; i < qSize; i++) {
            const curr = q[head++]
            
            // 종료 조건 
            if (curr===target) {
                return count
            }
            
            words.forEach((word, index)=>{
                if (visited[index]) return
                let diffCount = 0;
                for (let i = 0; i < word.length; i++) {
                    if (word[i]!==curr[i]) diffCount++
                }
                if (diffCount === 1) {
                    q.push(word)
                    visited[index] = true
                }
            })   
        }
        count++
    }
    return 0
}
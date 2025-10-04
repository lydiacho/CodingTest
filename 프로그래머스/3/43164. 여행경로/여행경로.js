// ICN부터 시작해서, 모든 항공권써서 여행 
// 가능한 경로는 알파벳 순으로 -> sort하고 DFS 시작 

// tickets sort하고 시작해 icn 부터 시작해서 
// 이 문제가 어려운 이유 : 인덱스로 visited를 처리하지 못한다 
// -> 라고 생각했는데?? 그냥 인덱스로 풀고있다; 
function solution(tickets) {
    tickets.sort((a,b)=>{
        if (a[0]===b[0]) {
            return a[1] > b[1] ? 1 : -1
        }
        return a[0] > b[0] ? 1 : -1
    })
    
    const ticketLength = tickets.length
    const visited = Array.from({length: ticketLength}).fill(false)
    const arr = ['ICN']
    
    function dfs(공항) { 
        // tickets를 순회하면서 공항이 0번쨰요소인 경우를 찾고 -> visited 여부 체크 
        tickets.forEach(([start,end], index)=>{
            if (start !== 공항) return
            if (visited[index]) return
            arr.push(end)
            visited[index] = true
            dfs(end)
            if (arr.length !== tickets.length + 1) {
                visited[index] = false
                arr.pop()
            }
        })
    }
    
    dfs('ICN')
    
    return arr
}
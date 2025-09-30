// 연결 그래프의 개수, 
function solution(n, computers) {
    let count = 0
    const visited = Array.from({length: n}).fill(false)
    
    function dfs(idx) {
        visited[idx] = true
        for (let k = 0; k < n; k++) {
            if (k===idx || computers[idx][k]===0 || visited[k]) continue
            dfs(k)
        }
        
    }
    
    for(let i = 0; i < n; i++) {
        if (!visited[i]) {
            count++
            dfs(i)
        }
    }
    
    
    return count
}
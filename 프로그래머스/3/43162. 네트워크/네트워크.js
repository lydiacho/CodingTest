// 그래프 개수 구하기 문제 -> 탐색하다가 나 자신에게 돌아오면 count + 1하기 
function solution(n, computers) {
    let count = 0
    const visited = new Array(n).fill(false)
    
    function bfs(idx) {
        console.log("bfs 실행 : ", idx)
        visited[idx] = true // 방문 표시 
        computers[idx].forEach((v, i) => {
            if (v=== 0 || i===idx || visited[i]) {
                return
            }
            bfs(i)
        })
    }
    
    for (let k = 0; k < n ; k++) {
        if (!visited[k]) {
            bfs(k)
            count++            
        }
    }
    
    return count
    
}
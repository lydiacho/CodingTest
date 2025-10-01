// 상대팀 진영까지 칸의 최소 개수, 불가능하면 -1 
const dxdy = [[0, 1],  [0, -1], [1, 0], [-1,0]]
function solution(maps) { // nxm
    const n = maps.length
    const m = maps[0].length
    const q = []
    let head = 0
    q.push([0,0])
    maps[0][0] = 0
    
    // q의 길이만큼 front를 뽑고, 인접 push 
    let count = 1
    
    while (q.length > head) {
        console.log(q.length, head)
        const qLength = q.length - head

        for (let i = 0; i < qLength; i++) {
            const [currX, currY] = q[head]
            head++
            
            if (currX === n-1 && currY === m-1) {
                return count
            }

            dxdy.forEach(([dx,dy])=>{
                const [x,y] = [dx+currX,dy+currY]
                if (x>=0 && x <n && y >= 0 && y < m && maps[x][y]===1) {
                    q.push([x,y])
                    maps[x][y] = 0
                }
            })   
        }
        count++
        
    }
    
    return -1
}
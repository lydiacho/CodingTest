// 최소 거리 구하기 : bfs에서 depth 도출하기 
// 겹쳐있는 직사각형 정보를 보고, 캐릭터가 이동할 수 있는 경로인지를 판단해야 함 
// visited 이차원 배열로 갈 수 있는 경로 표시하기 
function solution(rectangle, characterX, characterY, itemX, itemY) {
    // rectangle을 순회하면서 처음에 [좌하단x, 좌하단y, 우상단x, 우상단y]
    
    // 2배하는 이유 : 서로 모서리가 1칸 차이 나는 사각형의 경우 좌표에서 건너갈 수 있다고 오해 가능
    characterX *= 2
    characterY *= 2
    itemX *= 2
    itemY *= 2
    const doubleRec = rectangle.map(rect=>rect.map(v=>v*2))
    const visited = Array.from({length: 103}, ()=>Array.from({length: 103}).fill(0))
        
    doubleRec.forEach(([좌하단x, 좌하단y, 우상단x, 우상단y])=>{
        for (let x = 좌하단x; x <= 우상단x; x++) {
            for (let y = 좌하단y; y <= 우상단y; y++) {
                // 사각형 모서리를 좌표에 표시하는 방법 기억하기
                if (x === 좌하단x || x === 우상단x || y === 좌하단y || y === 우상단y) {
                    if (visited[x][y] === 0) {
                        // 누군가의 내부가 아닌, 아직 가보지 않은 영역일 때 
                        visited[x][y] = 1
                    }
                } else {
                    // 사각형의 내부 
                    visited[x][y] = 2
                }
            }
        }
    })
        
    // bfs로 1인 길만 따라다니기 
    visited[characterX][characterY] = 0
    const q = [[characterX, characterY]]
    let head = 0;
    const dxdy = [[-1, 0], [0, -1], [1, 0], [0, 1]]
    let count = 0;
    
    while (q.length > head) {        
        const qSize = q.length - head
        for (let i = 0; i < qSize; i++) {
            const [x, y] = q[head++]
            if (x===itemX && y===itemY) {
                return count / 2
            }
            dxdy.forEach(([dx,dy])=>{
                if (visited[x+dx][y+dy]===1) {
                    visited[x+dx][y+dy] = 0
                    q.push([x+dx,y+dy])
                }
            })
        }
        // 주의 : count 증가가 반드시 for문 밖에서 일어나야함
        count++
    }
    return count / 2    
}
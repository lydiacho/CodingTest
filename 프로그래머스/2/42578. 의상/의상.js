function solution(clothes) {
    const obj = clothes.reduce((acc,[의상,종류])=>{
        if (acc[종류]) {
            acc[종류].push(의상)
        } else {
            acc[종류] = [의상]
        }
        return acc
    },{})
    const counts = Object.values(obj).map(v=>v.length)
    return counts.reduce((acc,curr)=> acc *= (curr+1), 1) - 1
}
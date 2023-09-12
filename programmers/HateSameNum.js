/*
배열 arr가 주어집니다. 배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다. 
이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다. 
단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다. 
예를 들면,
arr = [1, 1, 3, 3, 0, 1, 1] 이면 [1, 3, 0, 1] 을 return 합니다.
arr = [4, 4, 4, 3, 3] 이면 [4, 3] 을 return 합니다.
배열 arr에서 연속적으로 나타나는 숫자는 제거하고 남은 수들을 return 하는 solution 함수를 완성해 주세요.
*/

/* 고민 로직 : 
- 중복 값 삭제라고 set 사용하면 안됨 <- 연속 등장 수만 삭제하기 때문, 순서 유지해야 하기 때문. 
- arr의 값을 하나씩 뽑아서 스택에 push 
- 넣을 때마다 top에 있는 값과 비교해서 동일하면 넣지X, 다르면 넣기 
*/

function solution(arr) {
  const stack = [];
  for (el of arr) {
    if (stack[stack.length - 1] === el) {
      continue;
    }
    stack.push(el);
  }
  return stack;
}

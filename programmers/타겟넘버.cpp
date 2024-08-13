#include <string>
#include <vector>

using namespace std;

static int num_count = 0; 

void DFS(vector<int> numbers,int target, int idx, int sum) {
    if (idx == numbers.size()) {
        if (sum == target)
          num_count++;
        return;
    }

    DFS(numbers, target, idx + 1, sum + numbers[idx]);
    DFS(numbers, target, idx + 1, sum - numbers[idx]);
}

int solution(vector<int> numbers, int target) {
    target = target;

    DFS(numbers, target, 0, 0); // 시작 노드, 인덱스, 합 

    return num_count;
}
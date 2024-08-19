#include <string>
#include <vector>

using namespace std;

vector<bool> visited;
vector<bool> done;

void dfs(int idx, int n, vector<vector<int>> computers){
    visited[idx] = true;
    
    for (int i = 0; i < n; i++) {
        if (i==idx) continue;
        if (computers[idx][i] == 1 && !visited[i]) {
            dfs(i, n, computers);
        }
    }
}

int solution(int n, vector<vector<int>> computers) {
    int answer = 0;
    visited = vector<bool>(n, false);
    
    for (int k = 0; k < n; k++) {
        if (!visited[k]) {
            dfs(k, n, computers);
            answer++;   
        }
    }
    
    return answer;
}
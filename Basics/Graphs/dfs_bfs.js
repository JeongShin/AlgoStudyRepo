import {Graph} from './Graphs'

class TRAVERSAL extends Graph {
    dfs_recursive(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList; //여기서 this는 클래스 내부 adjlist 가 됨.
        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            // console.log(this.adjacencyList[vertex]) -> error -> function 내부에서 this 의 바인딩이 달라짐 !
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor])
                    return dfs(neighbor);
            })
        })(start);
        return result;
    }

    dfs_iterative(start) {
        const stack = [start];
        const result = [];
        const visited = {};
        let currVertex;
        visited[start] = true;
        while (stack.length) {
            currVertex = stack.pop();
            result.push(currVertex);

            this.adjacencyList[currVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            })
        }
        return result;
    }

    bfs(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currVertex;
        visited[start] = true;
        while (queue.length) {
            currVertex = queue.shift();
            result.push(currVertex);
            // or this.adjacencyList[currVertex].slice().reverse().forEach(...
            this.adjacencyList[currVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            })
        }
        return result;
    }
}

const g = new TRAVERSAL();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

/*   graph g
*       A
*    /     \
*  B         C
*  \         \
*   D ------ E
*    \     /
*       F
* */

const g_dfs_re = [] = g.dfs_recursive("A");
console.log(g_dfs_re);
//[ 'A', 'B', 'D', 'E', 'C', 'F' ]

const g_dfs_it = [] = g.dfs_iterative("A");
console.log(g_dfs_it);
//[ 'A', 'C', 'E', 'F', 'D', 'B' ]
// -> 스택에 B, C 가 push 되고 C가 먼저 pop 되기 때문에 스택 특성상 B가 마지막으로 pop.

const bfs = [] = g.bfs("A");
console.log(bfs);
//[ 'A', 'B', 'C', 'D', 'E', 'F' ]

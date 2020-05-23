/*
* 성능 향상을 위해 Binary Heap Priority Queue를 사용할 수 있습니다.
* */

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({val, priority});
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    };

    sort() {
        this.values.sort((a, b) => a.priority - b.priority)
    }
}

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex])
            this.adjacencyList[vertex] = [];
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node: vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});
    }

    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let smallest;
        const path = []
        // build up initial state
        for (const vertex in this.adjacencyList) {
            distances[vertex] = vertex === start ? (nodes.enqueue(vertex, 0), 0) : (nodes.enqueue(vertex, Infinity), Infinity)
            previous[vertex] = null;
        }
        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                // DONE BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) {
                    path.push(smallest)
                    smallest = previous[smallest]
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (const neighbor in this.adjacencyList[smallest]) {
                    // find neighboring node
                    const nextNode = this.adjacencyList[smallest][neighbor];
                    // calculate new distance to neighboring node
                    // console.log(nextNode)
                    // candidate = current node distance + neighbor node distance
                    const candidate = distances[smallest] + nextNode.weight;
                    const nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        // updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate
                        // updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse()
    }
}


/* Test Data */
const graph = new WeightedGraph();

graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")

graph.addEdge("A", 'B', 4)
graph.addEdge("A", 'C', 2)
graph.addEdge("B", 'E', 3)
graph.addEdge("C", 'D', 2)
graph.addEdge("C", 'F', 4)
graph.addEdge("D", 'E', 3)
graph.addEdge("D", 'F', 1)
graph.addEdge("E", 'F', 1)

const path = graph.Dijkstra('A', 'E')
console.log(path)

/*Undirected Graph Implementation*/

class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex){
        //Vertex 중복 방지
        if (!this.adjacencyList[vertex])
            this.adjacencyList[vertex] = [];
    }

    //remove all edges related with this edge & this edge itself
    removeVertex(vertex) {
        //array.length -> # of elements in array
        while(this.adjacencyList[vertex].length){
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex); // no direction order doesn't matter
        }
        delete this.adjacencyList[vertex];
    }

    addEdge(from, to){
        this.adjacencyList[from].push(to);
        this.adjacencyList[to].push(from);
    }

    removeEdge(from, to){
        this.adjacencyList[from]=this.adjacencyList[from].filter(
            vertex => vertex !== to
        );
        this.adjacencyList[to]=this.adjacencyList[to].filter(
            vertex => vertex !== from
        );
    }
}
var g = new Graph();
g.addVertex("Tokyo");
g.addVertex("Seoul");
g.addEdge("Tokyo", "Seoul");
g.removeVertex("Seoul");
console.log(g);

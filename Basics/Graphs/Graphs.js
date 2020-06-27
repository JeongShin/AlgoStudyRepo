/*
* Basic Graph Implementation
* Error Handling Required !
* */

export class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        //Vertex 중복 방지
        if (!this.adjacencyList[vertex])
            this.adjacencyList[vertex] = [];
    }

    //remove all edges related with this edge & this edge itself
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex); // no direction order doesn't matter
        }
        delete this.adjacencyList[vertex];
    }

    addEdge(from, to) {
        this.adjacencyList[from].push(to);
        this.adjacencyList[to].push(from);
    }

    removeEdge(from, to) {
        this.adjacencyList[from] = this.adjacencyList[from].filter(
            vertex => vertex !== to
        );
        this.adjacencyList[to] = this.adjacencyList[to].filter(
            vertex => vertex !== from
        );
    }
}

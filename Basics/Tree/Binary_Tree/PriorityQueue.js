class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.elements.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.elements.length - 1;
        const element = this.elements[idx];
        while (idx > 0) {
            let parentIdx = ~~((idx - 1) / 2);
            let parent = this.elements[parentIdx];
            // Swap elements
            if (element.priority <= parent.priority)
                break;
            this.elements[parentIdx] = element;
            this.elements[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue(){
        const max = this.elements[0];
        const end = this.elements.pop();
        if (this.elements.length > 0) {
            this.elements[0] = end;
            this.bubbleDown();
        }
        return max;
    }

    bubbleDown() {
        let idx = 0;
        const length = this.elements.length;
        const element = this.elements[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swapIdx = null;
            if (leftChildIdx < length) {
                leftChild = this.elements[leftChildIdx];
                if (leftChild.priority > element.priority) {
                    swapIdx = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.elements[rightChildIdx];
                if (
                    (swapIdx === null && rightChild.priority > element.priority) ||
                    (swapIdx !== null && rightChild.priority > leftChild.priority)
                )
                    swapIdx = rightChildIdx;
            }
            if (swapIdx === null)
                break;
            this.elements[idx] = this.elements[swapIdx];
            this.elements[swapIdx] = element;
        }
    }
}


class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority
    }
}

let ER  = new PriorityQueue();
ER.enqueue("common cold", 1);
ER.enqueue("gun shot wound", 3);
ER.enqueue("high fever", 5);
ER.dequeue();
console.log(ER);

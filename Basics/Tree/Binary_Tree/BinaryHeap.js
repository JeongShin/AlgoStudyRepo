class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }

    /* Once element is added to end of array
    * Bubble up the element until it's placed
    * at corresponding position */
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = ~~((idx - 1) / 2);
            let parent = this.values[parentIdx];
            // Swap Values
            if (element <= parent)
                break;
            else {
                this.values[parentIdx] = element;
                this.values[idx] = parent;
                idx = parentIdx;
            }
        }
    }

    /* 1) Find the index of root
    *  2) Place new max at root
    * */
    bubbleDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swapIdx = null;
            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild > element) {
                    swapIdx = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swapIdx === null && rightChild > element) ||
                    (swapIdx !== null && rightChild > leftChild)
                )
                    swapIdx = rightChildIdx;
            }
            if (swapIdx === null)
                break;
            this.values[idx] = this.values[swapIdx];
            this.values[swapIdx] = element;
        }
    }

    extractMax() {
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.bubbleDown();
        }
        return max;
    }

}

let maxHeap = new MaxBinaryHeap();

maxHeap.insert(41);
maxHeap.insert(39);


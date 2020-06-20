/*
* Quick Sort Implementation
* */

// swap function is commonly used
const swap = (arr, l, r) => {
    [arr[l], arr[r]] = [arr[r], arr[l]];
};

/*Mid Pivot Implementation */
function midPivot(arr, left, right) {
    const pivot = arr[~~((right + left) / 2)];
    let [l, r] = [left, right];
    while (l <= r) {
        while (arr[l] < pivot)
            l++;
        while (arr[r] > pivot)
            r--;
        if (l <= r) {
            swap(arr, l, r);
            l++;
            r--;
        }
    }
    return l;
}

/*Left Pivot Implementation */
function leftPivot(arr, left, right) {
    const pivot = arr[left];
    let l = left;
    const len = arr.length;
    for (let r = left + 1; r < len; r++) {
        if (pivot > arr[r]) {
            l++;
            swap(arr, l, r);
        }
    }
    swap(arr, left, l);
    return l;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let idx = leftPivot(arr, left, right);
        // let idx = midPivot(arr, left, right);
        quickSort(arr, left, idx - 1);
        quickSort(arr, idx + 1, right);
    }
    return arr;
}

const arr = [3, 1, 5, 8, 2, 2, 9, 4, 1];
quickSort(arr);
console.log(arr);



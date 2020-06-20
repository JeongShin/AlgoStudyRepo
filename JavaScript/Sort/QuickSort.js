/*
* mid pivot
* */
function partition(arr, left, right) {
    const pivot = arr[~~((right + left) / 2)];
    const swap = (arr, l, r) => {
        [arr[l], arr[r]] = [arr[r], arr[l]];
    };
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

function quickSort(arr, left = 0, right = arr.length - 1) {
    let idx = partition(arr, left, right);
    if (left < idx - 1) // more elements on the left side of pivot
        quickSort(arr, left, idx - 1);
    if (idx < right) // more elements on the right side of pivot
        quickSort(arr, idx, right);
    return arr;
}

const arr = [3, 1, 5, 8, 2, 2, 9, 4, 1];
const sorted = quickSort(arr);
console.log(sorted);

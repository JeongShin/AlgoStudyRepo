function knapSack(profits, weights, capacity) {
    let cache = [];
    const len = profits.length * (profits.length === weights.length);
    for (let g = 0; g < len + 1; g++) {
        cache[g] = [];
        for (let h = 0; h < capacity + 1; h++) {
            cache[g][h] = 0;
        }
    }
    for (let i = 0; i < len + 1; i++) {
        for (let j = 0; j < capacity + 1; j++) {
            if (i === 0 || j === 0)
                cache[i][j] = 0;
            else if (weights[i - 1] <= j) {
                let included = profits[i - 1] + cache[i - 1][j - weights[i - 1]];
                let excluded = cache[i - 1][j];
                cache[i][j] = Math.max(included, excluded);
            } else
                cache[i][j] = cache[i - 1][j]
        }
    }
    // return cache[items.length][W];
    return cache;
}

console.log(knapSack([6, 3, 5, 4, 6].reverse(), [2, 2, 6, 5, 4].reverse(), 10));
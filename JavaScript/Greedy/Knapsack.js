function Knapsack(n, m) {
    const p = [25, 24, 15];
    const w = [18, 15, 10];
    let sorted_w = [...w];
    const pw = [];

    p.forEach((el, idx) => {
        pw[idx] = el / w[idx];
    });
    // pw = [1.388888, 1.6, 1.5] -> [1.6, 1.5, 1.38888] sort 후

    sorted_w.sort((a, b) => pw[w.indexOf(b)] - pw[w.indexOf(a)]);

    let sol = new Array(n).fill(0);
    let i;
    let sack = m;
    for (i = 0; i < n; i++) {
        if (sorted_w[i] > sack) break;
        sol[w.indexOf(sorted_w[i])] = 1;
        sack -= sorted_w[i];
    }
    if (i < n)
        sol[w.indexOf(sorted_w[i])] = sack / sorted_w[i];
    return sol;
}

const result = Knapsack(3, 20);
console.log(result);



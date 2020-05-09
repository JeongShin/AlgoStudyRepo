/*
 * DKU - Algorithm 8주차 - 1 예제 프로그램
 *
 * 32162417 소프트웨어 신정웅
 *
 * 문제: Greedy Algorithm - Knapsack Problem
 *
 * 조건:
 * p -> profit, 이익  w -> weight, 무게
 *
 * return 값:
 * 가방에 넣을수 있는 item의 개수에 대한 (double 형) 배열
 *
 * 한계점:
 * zero - one knapsack의 경우, 즉 가져오거나 못가져오거나 분할이 안되는
 * 경우는 feasible solution 을 구하지 못한다.
 *
 * 시간복잡도: O(n log n)
 * */

function Knapsack(n, m) {
    const p = [25, 24, 15];
    const w = [18, 15, 10];
    let sorted_w = [...w];
    const pw = [];

    p.forEach((el, idx)=>{
        pw[idx] = el / w[idx];
    });
    // pw = [1.388888, 1.6, 1.5] -> [1.6, 1.5, 1.38888] sort 후

    sorted_w.sort((a,b)=> pw[w.indexOf(b)]-pw[w.indexOf(a)]);
    console.log(sorted_w); // [15, 10, 18]

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
Knapsack(3, 20);



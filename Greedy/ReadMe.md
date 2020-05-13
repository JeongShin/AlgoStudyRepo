# 그리디 알고리즘 정리 
## 1. Knapsack 
> DKU - Algorithm 8 주차 - 1 예제 프로그램 

### 1 - 1. Problem 
* 변수    
p : profit, 이익 w: weight, 무게
* 리턴 값    
가방에 넣을수 있는 item 개수에 대한 배열
* 한계점     
zero-one knapsack의 경우, 즉 가져오거나 못가져오거나 분할이 불가능한 경우 feasible solution 을 구하지 못한다. 
    * zero - one knapsack 의 경우 solution : [Dynamic Knapsack](https://github.com/JeongShin/AlgoStudyRepo/tree/master/Greedy#1---1-problem)
* 시간 복잡도     
O(n logn)

### 1 - 2. Code 

```JS
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
```

## 2. TVSP - Tree Vertex Splitting Problem
> DKU - Algorithm 8 주차 - 2 예제 프로그램 
### 2 - 1. Problem 
* 변수     
T : tree V : Vertex E : Edge w : weight     
X : []
분할된 트리를 T/X로 나타냅니다.      
X = [3]을 예로 node 3 에서 분할된 sub-tree가 생깁니다.  


* 리턴 값     
최적의 해는 다음과 같은 조건을 만족해야 합니다 .
1. X 가 최소의 정점을 가진 집합
2. 최대 간선의 가중치가 delta 이하 값

* 시간 복잡도     
O (n)

### 2 - 2. pseudo code       
T -> 현재 정점, p -> 부모 정점
```$xslt
TVS(Tree T, int p, int delta)
{
    if (T != null) {
        d[T] = 0;
        for (each child v of T){
            TVS(v, delta);
            d[T] = max {d[T], d[v] + w[T][v]};
        }
        if ((T is not the root) && (d[T] + w[parent (T)] > delta)){
            print(T);
            d[T] = 0;}
    }
}
```

TVS는 트리의 Post Order로 방문 -> d 값이 맨 아래부터 위로 올라오면서 결정됨












# 
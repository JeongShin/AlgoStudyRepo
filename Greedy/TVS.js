// DKU - Algorithm 8주차 -2
//
// 32162417 소프트웨어 신정웅
//
// 문제 : TVSP - Tree Vertex Splitting Problem
//
// 조건 )
// T -> T (V, E, w) 간선에 가중치, w, 를 가지는 방향
//
// X -> 분할된 트리 T / X 로 나타냄
// ex) X = [3]  -> 3 노드에서 분할된 sub-tree 가 생김
// 1. X가 최소의 정점을 가진 집합을 구해야함.
// 2. 최대 간선 가중치가 delta 이하여야 함.
//
//     Approach 1. Simple, in-efficient
// V의 모든 부분집합에 대하여 조건을 만족하는 X를 구한다
//     -> 2 ^ V 의 부분 집합이 있어 엄청난 시간
//
// Approach 2. Greedy, efficient
// 각 노드 u 에 대하여
// d(u) = max {d(k) + w(u, k)}
// if (d(u) + w(v, u) > delta)
//
//
//     pseudo code
// T -> 현재 정점, p -> 부모 정점
// TVS(Tree T, int p, int delta)
// {
//     if (T != null) {
//         d[T] = 0;
//         for (each child v of T){
//             TVS(v, delta);
//             d[T] = max {d[T], d[v] + w[T][v]};
//         }
//         if ((T is not the root) && (d[T] + w[parent (T)] > delta)){
//             print(T);
//             d[T] = 0;}
//     }}
//
// TVS는 트리의 Post Order로 방문 -> d 값이 맨 아래부터 위로 올라오면서 결정됨.
//
//     시간복잡도 : 정점수의 비례  O (n)
//
//
// return 값
// delta -> 한계값, delta, 에 대하여 d(T/X) <= delta 를 만족하는 가장 작은 크기의 집합
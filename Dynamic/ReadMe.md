# Dynamic Programming

### Dynamic Programming 이란? 
> 일련의 결정들(sequence of decisions)의 결과로 해를 구하는 알고리즘 설계 방법

* 예제 1. 배낭 문제    
Xi 의 값을 차례대로 결정. 즉, X1의 값, X2, X3...를 순서대로 결정하여 이익을 최대화 하는 것. 

* 예제 2. 최단 경로    
정점 i로 부터 j로의 최단 경로로  어느 정점을 결정해 나갈지 최단 경로를 결과로 내는 것. 


### Principle of Optimality 
> 중간 결정(decision)에 대하여 그 이전의 결정들과 그  이후의 결정들 모두가 optimal 이어야 한다. 
>
최적성의 원칙은 성립하는 경우도 있고 아닌 경우도 있기 때문에 동적 프로그래밍을 설계하기 전예 고려해야한다. 

#### Greedy vs Dynamic 
* Greedy    
오직 하나의 decision sequence가 만들어 진다. 
* Dynamic    
많은 decision sequence가 만들어져 최적의 가능성이 없는 순서열은 생성되지 않게 한다. 

#### Forward 접근

## 문제 정의
	문자열 X, Y 에 대하여 X 문자열을 편집하여 Y 까지의 경로를 구합니다. 단, Dynamic Programming  기법을 이용하여 최소 비용으로만 편집 경로를 구합니다. 
	Cost for Operation은 임의로 
		1. Insertion : 1 ex) “ab” -> “abb” 
		2. Deletion : 1 ex) “abb” -> “ab”  
		3. Change : 2 ex) “ab” -> “aa” 
로 정해주었습니다.
## 문제 분석
**Goal :  X 문자열을 편집하여 최종 문자열 Y 로 가는  최소 비용 경로를 구합니다.**
* Step 1. 문자열에 관한 정보들을 사용자로 부터 입력 받습니다. 
* Step 2. 문자열 편집 Table 을 생성 합니다. 
* Step 3. Table을 이용하여 도착지에서 출발지로 역추적 합니다.
* Step 4. Path 의 validation 을 검사 합니다. 

Table 을 구성하기 위해 다음과 같이 정의 하였습니다. 
## 클래스 정의
    Cost Table 은 문자열 편집 과정을 나타내는 테이블 입니다. 테이블에 X가 Y로 가는 모든 경로를 담기 위해 [lenX] * [lenY] 의 크기 테이블을 생성 합니다. 테이블에는 다음과 같은 정보를 포함해야 합니다.
		1. 현재 문자열
		2. 현재 문자열까지 오는 가중치
이 두가지 정보를 저장하기 위해 객체 s 에 대한 정의를 아래와 같이 해주었습니다. 

```JAVA 
public static class s {
    String data; // 문자열이 편집되는 동안 발생하는 현재 문자열 의미 합니다
    int weight; // 현재 문자열까지 오는데 걸리는 최소 비용을 의미 합니다
    int x_pos; // Table에서 위치 x position 을 의미 합니다
    int y_pos; // Table에서 위치 y position 을 의미 합니다 
    public s(String s, int weight, int x_pos, int y_pos) {
        this.data = s;
        this.weight = weight;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
    }
}
```
## 메소드 정의
### Step 1. 
문자열에 관한 정보들을 사용자로 부터 입력 받습니다.  
```JAVA
static int lenX;
static int lenY;
static s[][] table;
```
문자열 길이, 테이블은 구현상 편의를 위해 대부분의 메소드에서 공통적으로 쓰이기 때문에 Global Variable 로 선언 해주었습니다. 
### Step 2. 
Table 을 생성 & 초기화 합니다.
init_table() 메소드는 인자로 문자열 x, y를 받아 옵니다. 
Table은 xpart 와 ypart 를 합쳐 만들어진 문자열과 왼쪽, 위, 대각선의 가중치 중 최소값 연산을 가지는 가중치로 s 객체를 생성하여 삽입 합니다. 
#### Pseudo Code 
```
for table up to down:
	get substring of x part
	for table left to right:
		get substring of y part
		if table is beginning (start): data is x and weight is 0
		else :
			get up.weight + 1 from up to curr weight 
			get left.weight + 1 from left to curr weight
			get diagonal.weight + 2 or 0 from diagonal to curr weight
				if diagonal data is equals to curr: += 0 
				else: +=2 
			get min weight operation
			insert table s with data of ypart + xpart & weight of min operation 
```
#### Implement
 init_table() 에 대한 코드  구현은 아래와 같습니다. 
```JAVA
public static void init_table(String x, String y) {
    s[][] table = new s[lenX + 1][lenY + 1];
    for (int i = 0; i <= lenX; i++) {
        String xpart = x.substring(i);
        for (int j = 0; j <= lenY; j++) {
            String ypart = y.substring(0, j);
            if (i == 0 || j == 0) {
                table[i][j] = new s(ypart + xpart, Math.max(i, j), i, j);
// s 가 i, j 가 하나라도 0 인 경우 가중치는 i, j 0이 아닌 값의 가중치를 가집니다 . 둘 다 0인 경우는 0 이 됩니다.  
                continue;
            }
            int weight_up = table[i - 1][j].weight + 1;
            int weight_left = table[i][j - 1].weight + 1;
            int weight_diagonal = table[i - 1][j - 1].data.equals(ypart + xpart) ? table[i - 1][j - 1].weight : table[i - 1][j - 1].weight + 2;
            int min = Math.min(weight_left, Math.min(weight_up, weight_diagonal));
            table[i][j] = new s(ypart + xpart, min, i, j);
        }
    }
}
```

### Step 3. 
Table을 이용하여 도착지에서 출발지로 역추적 합니다.
backtrack 함수는 ArrayList 로 path 를 선언한 뒤 depth first search 알고리즘으로 탐색이 이루어 집니다.  path가 구해지면 이를 reverse 하여 반환 합니다. 
> 단, dfs 의 경우 visited 조건을 따지지만 이 경우 minimum operation 조건을 검사하여 search 합니다.   
```JAVA
public static ArrayList<String> backtrack(s dest) {
    ArrayList<String> path = new ArrayList<>();
    dfs(dest, path);
    Collections.reverse(path);
    return path;
}
```
	역추적에 대한 구현 dfs 재귀적 호출의 방법으로 다음과 같이 이루어 집니다. 단 자바 언어 특성상 [-1] 음수 인덱스로 접근이 에러로 발생하기 때문에 null 인지 확인하는 대신 위치 값 xpos, ypos 이 0에 일때에 대한 처리를 해줍니다.  여기서 고려해야 할 상황이 2가지 발생 합니다. 
Two Exceptions to Consider 
	1. xpos, ypos 이 모두 0 인 경우는 탐색이 끝났음을 의미합니다. -> End of Search 
	2. xpos, ypos 중 둘중 하나가 0 인 경우는 더 이상 왼쪽 혹은 위로 갈 수 없기 때문에 0이 아닌 방향으로 이동 합니다.  -> Adjecent to upmost or leftmost 

#### Pseudo Code 
```
dfs(vertex):
	if end of search:
		add vertex to path & return
	add vertex to path
	if curr is leftmost:
		return up
	if curr is upmost:
		return left
// case 1 & 2 & 3 -> change, deletion, insertion is cheapest 
	if diagonal to curr is cheapest:
		return diagonal
	if up to curr is cheapest:
		return up
	if left to curr is cheapest:
		return left
```
위와 같이 pseudo code 에서 case 1, 2, 3의 선언 순서에 따라 조건을 중복적으로 만족하는 경우 어느 path 로 이동할지 우선 순위가 달라 집니다. 예를들어 
change cost 와 insertion cost 가 동일할 경우 change에 대한 검사가 먼저 이루어지기 때문에 대각선 위로 먼저 이동 합니다. 

```JAVA
public static s dfs(s vertex, ArrayList<String> path) {
	/* Exception : End of Search */
    if (vertex.x_pos == 0 && vertex.y_pos == 0) {
        path.add(vertex.data);
        return vertex;
    }
	/* Add current vertex to path */
    path.add(vertex.data);
	/* Exception : curr is adjacent to upmost || leftmost */
    if (vertex.x_pos == 0)
        return dfs(table[0][vertex.y_pos - 1], path);
    if (vertex.y_pos == 0)
        return dfs(table[vertex.x_pos - 1][0], path);
	/* Case 1. diagonal to curr is min operation */
    s diagonal = table[vertex.x_pos - 1][vertex.y_pos - 1];
    if (vertex.weight == diagonal.weight)
        return dfs(diagonal, path);
	/* Case 2. up to curr is min operation */
    s up = table[vertex.x_pos][vertex.y_pos - 1];
    if (vertex.weight - 1 == up.weight)
        return dfs(up, path);
	/* Case 3. left to curr is min operation */
    s left = table[vertex.x_pos - 1][vertex.y_pos];
    if (vertex.weight - 1 == left.weight)
        return dfs(left, path);
    return null;
}
```

### Step 4.
 path에 대한 validation을 검사 합니다. 
```JAVA 
    public static void is_path_valid(ArrayList<String> path, String x, String y) {
        String start = path.get(0);
        String end = path.get(path.size() - 1);
        System.out.println("x " + x + " equals " + "path start " + start + " : " + x.equals(start));
        System.out.println("y " + y + " equals " + "path end " + end + " : " + y.equals(end));
}
``` 
path 의 0번째 data 와 x 문자열 값, path 의 마지막 data 와 y 값을 String.eqauls() 함수를 이용하여 검증 합니다. 
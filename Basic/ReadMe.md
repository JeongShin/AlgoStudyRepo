# Useful JS functions implementation

### 1. Numbofcases

#### Code
```JS
function solution(arr) {
    const len = arr.length;
    // f 객체 생성
    const f = stack => {
        if (stack.length === len) {
            console.log(stack);
            return;
        }
        arr.forEach(
            v => {
                if (stack.indexOf(v) === -1) 
                    f([...stack, v]) //recursive call -> 기존 스택 + 새로운 v를 합쳐서 전달 
            })
    };
    f([]);
    solution([1, 2, 3]);
}
```

#### 1-1. JS Function Expression vs Function Declaration

###### 1-1-1 Function Declaration
```JS
hello();
function hello(){
    console.log('hello');
}
```
함수 표현식으로 선언할 시 함수가 ***Hoisting*** 됨. 

###### 1-1-2 Function Expression
```JS
hello(); // hello is not defined
let hello = function (){
    //someLogic
};  
hello();
```
함수가 변수 이름에 선언 되었기 때문에 변수 선언 전 hello()에선 ***Hoisting*** 되지 않는다. 
추가로 ES 6 Arrow Function이 사용 가능하다.  

#### 1-2. indexOf()
> JS Array.prototype.indexOf()
Return Value: Index of FirstElement or -1
``` JS
    arr.indexOf(searchElement [,fromIndex])
```

#### 1-3. Spread
> JS Spread Operator

1. In function Calls
2. In Array Literals
3. In Object Literals 

>functions
>Each elements are passed to function
```JS
console.log(..."HELLO"); // H E L L O 
Math.min(..."9832"); //2
```

> Array Literals
```JS
const temp = [23, 2, -36, 50, 73];
Math.min(temp) // returns NaN

// Without Using Spread
Math.min.apply(null, temp) // returns -36

// Using Spread 
Math.min (...temp) // returns -36
```

> Examples
```JS
const origin = ["JeongShin", "DKU", "Software"];
const copy = origin; // Copy is reference of origin
copy.push("WHAT?");
console.log(origin === copy); // true
//   둘 다 push 된다. 둘 다 메모리에 같은 객체를 가르키기 때문. 정확한 의미의 copy가 아님. 
const copy2 = [...origin]; //새로운 객체
copy2.push("WHAT?");
console.log(origin === copy); // false 
```

> Object Literals
```JS
const todos = [
    {user: "Jeong", completed: false, task: "Study"}
    ,{user: "Shin", completed: true, task: "Tennis"}
];
// Without Spread: 기존 todos에 대한 데이터가 변경된다.
function addToDo(newTodo){
    todos.push(newTodo);
}
// Spread: 복사본을 생성 하기 때문에 변경 X.
function addToDo(newTodo){
    return [...todos, {...newTodo, completed: false}]
}
const newTodos = addTodo({user: "Ikhyo", task: "Study"});
```


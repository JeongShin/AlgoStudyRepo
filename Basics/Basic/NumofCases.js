function solution(arr) {
    const len = arr.length;
    // f 객체 생성
    const f = stack => {
        console.log(stack);
        if (stack.length === len) {
            return;
        }
        arr.forEach(
            v => {
                if (stack.indexOf(v) === -1)
                    f([...stack, v])
            })
    };
    f([]);
}

solution([1, 2, 3]);
/*Code from @JunilHwang*/
function solution(arr) {
    const len = arr.length;
    // f 객체 생성
    const f = stack => {
        if (stack.length === len) {
            console.log(stack);
            return;
        }
        console.log(stack);
        arr.forEach(
            v => {
                if (stack.indexOf(v) === -1)
                    f([...stack, v])
            })
    };
    f([]);
}

solution([1, 2, 3]);
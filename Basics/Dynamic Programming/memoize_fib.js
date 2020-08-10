function memoize(func) {
    const cache = {};
    return function (...args) {
        if (cache[args])
            return cache[args];
        const result = func.apply(this, args);
        cache[args] = result;
        return result;
    }
}

function fib(n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}

fib = memoize(fib);

fib(3);
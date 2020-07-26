function commonSubstring(a, b) {
    const len = a.length
    for (let i = 0; i < len; i++) {
        const [A, B] = [new Set(a[i]), new Set(b[i])]
        let found = false
        for (const w of A) {
            if (B.has(w)) {
                found = true
                console.log('YES')
                break
            }
        }
        if (!found)
            console.log('NO')
    }
}

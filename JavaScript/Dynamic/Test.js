const str = 'TRSLPEIMIT' +
    'RCNHBIIHOD' +
    'ATRDNGAGHN' +
    'SOOMROOISE' +
    'TSCUEMCEFE' +
    'LE';
let first = new Array(str.length * 3).fill(" ");
let second = new Array(str.length * 3).fill(" ");
let third = new Array(str.length * 3).fill(" ");

for (let i = 0; i < (str.length); i += 4)
    first[i] = 'C';
for (let i = 1; i < (str.length); i += 2)
    second[i] = 'C';
for (let i = 2; i < (str.length); i += 4)
    third[i] = 'C';

let idx = 0;
first = first.map((el) => el === 'C' ? str[idx++] : el);
second = second.map((el) => el === 'C' ? str[idx++] : el);
third = third.map((el) => el === 'C' ? str[idx++] : el);

console.log(first.join(""))
console.log(second.join(""))
console.log(third.join(""))

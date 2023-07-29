function calculate(x, y) {
    let sum = 0;
    for (let i = 0; i < y; i++) {
        sum += x;
    }
    return sum
}

console.log(calculate(9, 2))
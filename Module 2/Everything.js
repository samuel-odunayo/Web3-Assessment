function every(array, test) {
    for (let i = 0; i < array.length; i++) {
        if (!test(array[i])) {
            return false;
        }
    }
    return true;
}

console.log(every([1, 3, 5], n => n < 10));
 // → true

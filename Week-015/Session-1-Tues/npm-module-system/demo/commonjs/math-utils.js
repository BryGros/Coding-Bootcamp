function add(a, b) {
    return a + b
}

function subtract(a,b) {
    return a - b
}

module.exports = {
    add, // make sure not to call the function, just the reference 
    subtract
}
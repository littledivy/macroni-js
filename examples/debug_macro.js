function macro__debug() {
    console.log(performance.now())
}

function doSomething() {
    debug()
    100 ** 100
    debug()
}

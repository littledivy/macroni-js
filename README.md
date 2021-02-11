# `macroni-js`

JavaScript with compile-time macros.

## Example

```javascript
function macro__debug() {
    console.log(performance.now());
}

// ...

function heavyFn() {
    // Call my lil macro
    debug();
    for (let i = 0; i < 1e9; i++);
    debug();
}
```

Transpiles to -

```javascript
function heaveFn() {
    {
        console.log(performance.now());
    };
    for (let i = 0; i < 1e9; i++);
    {
        console.log(performance.now());
    };
}
```
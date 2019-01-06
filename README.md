# Sequence-N-X
## Overview
Module used for generating sequences of indefinite length using a function with ability to reference previous elements
It produces values when needed and stores them after they were required for the first time


## Installation
```
$ npm i --save sequence-n-x
```

## Examples

Fibonacci numbers
```
const sq = require("sequence-n-x");
const fibonacciNumbers = sq ( (index,n)=> n(-1) + n(-2),[1,1])
console.log(fibonacciNumbers.take (10)); // 1 1 2 3 5 8 13 21 34 55
```

Triangular numbers using formula based on index
```
const triangularNumbers1 = sq((i,n) => (i * (i + 1)) / 2);
console.log(triangularNumbers1.take (5); // 0 1 3 6 10
```

Triangular numbers with calculating next element based on previous
```
const triangularNumbers1 = sq((i,n) => n(-1) + i);
console.log(triangularNumbers1.take (5); // 0 1 3 6 10
```

Range of integers starting with 0
```
console.log(sq().take(5)); // 0 1 2 3 4
```

## Interface

### Creating an object
const mySequence = sq(generatorFunction, initialValues, generateAtCreation);

### Generator function
A function that create and return element of a sequence
```
const generatorFunctionTriangular = (index , n) => n(-1)+i;
const  generatorFunctionFibo = (i,n)=> n(-1)+n(-2);
```
where
    index is a position in a sequence starting with 0 (similar to iterating over arrays with ar.map((x,i)=>... )
    n is a function that as an argument takes index of another element relative to one that is being created and returns it's value
        n(-1) is previous element, n(-2) is element before that
        n should be negative integer
        if -n > index then ( attempt to get element with index < 0) 0th element will be used


Note: instead of numbers other types (strings objects arrays etc) can be used as a return value
If omitted (i)=>i would be used as default, producing 0 1 2 3... sequence

###Initial values
Array of values that start a sequence and should be defined by hand. [1,1] in Fibonacci numbers
If there is a single value, it can be passed as a single value, not like an array

Default: [0]

### generateAtCreation
Normally new elements would be produced only when they are required, but user can specify number of elements that would be produced at the beginning
Default: 0

### Retrieving values
```
mySequence.take(amount)
```
returns array containing elements from 0th to amounth
```
mySequence.slice(start,end)
```
returns array containing elements from start to end (zero based indexes)
```
mySequence.get(index)
```
returns one element of provided index

## Value generation details
By default elements are generated when retrieving methods (take slice get) are called
Each element gets generated only once and then stored
```
    s1.take (5)
    s1.take (10) // returns 0 to 10 but produces only elements 6 to 10
```

When elements starting from specific index are needed whole range up to the last one is generated
```
    s2.slice(7,10) // returns 7 to 10 but produces 0 to 10
    s2.get ( 20) // produces 0 to 20
```
// go 함수 만들기
const go = (...args) => reduce((acc, func) => func(a), args);

// 0에서부터 시작해 111을 출력한다.
go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  console.log,
);

// pipe 함수 만들기
const pipe =
  (func, ...funcs) =>
  (...args) =>
    go(func(...args), ...funcs);

const func1 = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100,
);

// 111을 출력한다.
console.log(func1(0, 1));

// curry 함수 만들기
const curry =
  (func) =>
  (a, ..._) =>
    _.length ? func(a, ..._) : (..._) => func(a, ..._);

// curry 함수의 인자로 함수 하나만을 전달하여 새로운 함수를 반환한다.
const mult1 = curry((a, b) => a * b);

// mult1 함수는 두 개의 인자를 받을 때까지 평가 시점을 미룬다.
log(mult1(3)(2));

const mult2 = mult(3);
log(mult2(10));
log(mult2(5));
log(mult2(3));

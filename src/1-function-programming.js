// 순수 함수
const f1 = (a, b) => a + b;

// 일급 함수
const f2 = console.log

// 익명 함수 vs 기명 함수
const f3 = (a, b) => a + b;

const f4 = function f4 (a, b) {
    return a + b;
}

// 고차 함수
const f5 = (f) => f();

console.log(f5(() => 5))
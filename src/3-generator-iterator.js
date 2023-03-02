const log = console.log;

function* generator() {
  yield 1;
  yield 2;
  yield 3;
  return 100; // 생략할 수 있으며 값을 명시할 경우 done: true와 함께 값을 반환하지만 순회의 대상에는 포함되지 않는다.
}

let iter = generator();
log(iter[Symbol.iterator]() == iter); // 제너레이터는 Well-formed 이터레이터를 리턴한다.
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

for (const a of generator()) console.log(a);

// 홀수만 출력하기

function* oddsToInt(int) {
  for (let i = 0; i < int; i++) {
    if (i % 2) yield i;
  }
}

iter = oddsToInt(10);
log(iter.next()); //
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

let iter2 = odds(10);
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());

for (const a of odds(40)) log(a);

// # for of, 전개 연산자, 구조 분해, 나머지 연산자

log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);

import { log } from './lib/common.js';
import { curry, go, pipe } from './lib/curry-map-filter-reduce.js';

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) res.push(a);
  }
  return res;
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

console.time('');
go(
  range(100000),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(10),
  log,
);
console.timeEnd('');

let L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      yield a;
    }
  }
});

console.time('L');
go(
  L.range(Infinity),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(10),
  log,
);
console.timeEnd('L');

// ### map, filter 계열 함수들이 가지는 결합 법칙

// - 사용하는 데이터가 무엇이든지
// - 사용하는 보조 함수가 순수 함수라면 무엇이든지
// - 아래와 같이 결합한다면 둘 다 결과가 같다.

// [[mapping, mapping], [filtering, filtering], [mapping, mapping]] = [
//   [mapping, filtering, mapping],
//   [mapping, filtering, mapping],
// ];

// ## 결과를 만드는 함수 reduce, take

// ### reduce

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter),
);

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&'),
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }));

// function *a() {
//   yield 10;
//   yield 11;
//   yield 12;
//   yield 13;
// }
//
// log(join(' - ', a()));

// ### take, find

const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
];

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

log(find((u) => u.age < 30)(users));

go(
  users,
  L.map((u) => u.age),
  find((n) => n < 30),
  log,
);

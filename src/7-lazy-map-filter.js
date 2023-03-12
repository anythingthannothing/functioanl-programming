import { curry, take, pipe } from './lib/curry-map-filter-reduce.js';
import { log } from './lib/common.js';

let L = {};
L.map = function* (func, iter) {
  for (const a of iter) yield func(a);
};

L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

let it1 = L.map((value) => value + 10, [1, 2, 3]);
log(it1.next()); // {value: 11, done: false}
log(it1.next()); // {value: 12, done: false}
log(it1.next()); // {value: 13, done: false}
log(it1.next()); // {value: undefined, done: true}

L.filter = function* (func, iter) {
  for (const a of iter) if (func(a)) yield a;
};

let it2 = L.filter((a) => a % 2, [1, 2, 3, 4]);
log(it2.next()); // {value: 1, done: false}
log(it2.next()); // {value: 3, done: false}
log(it2.next()); // {value: undefined, done: true}

// ## L.map + take로 map 만들기

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));

log(map((a) => a + 10, L.range(4)));

// ## L.filter + take로 filter 만들기

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const filter = curry(pipe(L.filter, takeAll));

log(filter((a) => a % 2, L.range(4)));

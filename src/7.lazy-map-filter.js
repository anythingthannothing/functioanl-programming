import { log } from './lib/common.js';

let L = {};
L.map = function* (func, iter) {
  for (const a of iter) {
    yield func(a);
  }
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

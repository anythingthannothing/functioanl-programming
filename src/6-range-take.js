import { go, curry, reduce } from './lib/curry-map-filter-reduce.js';
import { test, add, log } from './lib/common.js';

// range
const range = (length) => {
  let i = -1;
  let res = [];
  while (++i < length) {
    res.push(i);
  }
  return res;
};

log(range(5)); // [0, 1, 2, 3, 4, 5]

log(range(2)); // [0, 1]

log(reduce(add, range(4))); // 6

// L.range
const L = {};
L.range = function* (length) {
  let i = -1;
  while (++i < length) {
    yield i;
  }
};

log(L.range(5)); // [0, 1, 2, 3, 4, 5]

log(L.range(2)); // [0, 1]

log(reduce(add, L.range(4))); // 6

test('range', 10, () => reduce(add, range(1000000)));
test('range', 10, () => reduce(add, L.range(1000000)));

const take = curry((limit, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == limit) return res;
  }
  return res;
});

go(range(10000), take(5), log);

log(take(5, L.range(100)), log);

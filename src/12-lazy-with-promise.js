import {
  log,
  map,
  filter,
  reduce,
  add,
  go,
  go1,
  L,
  take,
} from './lib/common.js';

// ## 지연 평가 + Promise - L.map, map, take

go(
  [1, 2, 3],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log,
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  log,
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log,
);

go(
  [1, 2, 3],
  map((a) => Promise.resolve(a + 10)),
  log,
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map((a) => a + 10),
  log,
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map((a) => Promise.resolve(a + 10)),
  log,
);

// ## Kleisli Composition - L.filter, filter, nop, take

go(
  [1, 2, 3, 4, 5, 6],
  L.map((a) => Promise.resolve(a * a)),
  L.map((a) => a * a),
  filter((a) => Promise.resolve(a % 2)),
  L.map((a) => a * a),
  take(4),
  log,
);

// ## reduce에서 nop 지원

go(
  [1, 2, 3, 4, 5],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce(add),
);

go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map((a) => {
    return new Promise((resolve) => setTimeout(() => resolve(a * a), 1000));
  }),
  L.filter((a) => {
    return new Promise((resolve) => setTimeout(() => resolve(a % 2), 1000));
  }),
  take(3),
  reduce(add),
  log,
);

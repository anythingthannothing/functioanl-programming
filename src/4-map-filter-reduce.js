const people = [
  { name: 'kku', age: 33 },
  { name: 'kki', age: 34 },
  { name: 'kko', age: 35 },
  { name: 'kkp', age: 36 },
  { name: 'kkq', age: 37 },
];

// map
const map = (func, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(func(a));
  }
  return res;
};

// filter
const filter = (func, iter) => {
  let res = [];
  for (const a of iter) {
    if (func(a)) res.push(a);
  }
  return res;
};

// reduce
const reduce = (func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = func(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;

console.log(
  reduce(
    add,
    map(
      (p) => p.age,
      filter((p) => p.age < 35, people),
    ),
  ),
);

console.log(
  reduce(
    add,
    filter(
      (n) => n >= 35,
      map((p) => p.age, people),
    ),
  ),
);

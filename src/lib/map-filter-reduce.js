const map = (func, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(func(a));
  }
  return res;
};

const filter = (func, iter) => {
  let res = [];
  for (const a of iter) {
    if (func(a)) res.push(a);
  }
  return res;
};

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

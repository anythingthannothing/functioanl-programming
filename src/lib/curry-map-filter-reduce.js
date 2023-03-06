export const curry =
  (func) =>
  (arg, ..._) =>
    _.length ? func(arg, ..._) : (..._) => func(arg, ..._);

export const map = curry((func, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(func(a));
  }
  return res;
});

export const filter = curry((func, iter) => {
  let res = [];
  for (const a of iter) {
    if (func(a)) res.push(a);
  }
  return res;
});

export const reduce = curry((func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = func(acc, a);
  }
  return acc;
});

export const go = (...args) => reduce((acc, func) => func(acc), args);

export const pipe =
  (func, ...funcs) =>
  (...args) =>
    go(func(...args), ...funcs);

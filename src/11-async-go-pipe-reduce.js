// ## go, pipe, reduce에서 비동기 제어

go(
  Promise.resolve(1),
  (a) => a + 10,
  (a) => Promise.reject('error~~'),
  (a) => console.log('----'),
  (a) => a + 1000,
  (a) => a + 10000,
  log,
).catch((a) => console.log(a));

// ## promise.then의 중요한 규칙

Promise.resolve(Promise.resolve(1)).then(function (a) {
  log(a);
});

new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(
  log,
);

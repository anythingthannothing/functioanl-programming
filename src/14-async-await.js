// ## async/await

function delay(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

async function delayIdentity(a) {
  await delay(500);
  return a;
}

async function f1() {
  const a = await delayIdentity(10);
  const b = await delayIdentity(5);
  return a + b;
}

// const pa = Promise.resolve(10);
const pa = f1();

(async () => {
  // log(await pa);
  // log(await pa);
  // log(await pa);
})();
// f1();
// f1().then(log);
// go(f1(), log);
// (async () => {
//   log(await f1());
// }) ();

// ## QnA. Array.prototype.map이 있는데 왜 FxJS의 map 함수가 필요한지?

function delayI(a) {
  return new Promise((resolve) => setTimeout(() => resolve(a), 100));
}

async function f2() {
  const list = [1, 2, 3, 4];
  const temp = list.map(async (a) => await delayI(a * a));
  // log(temp);
  const res = await temp;
  // log(res);
}

f2();

async function f3() {
  const list = [1, 2, 3, 4];
  const temp = map((a) => delayI(a * a), list);
  // log(temp);
  const res = await temp;
  // log(res);
}

f3();

function f4() {
  return map((a) => delayI(a * a), [1, 2, 3, 4]);
}

(async () => {
  // log(await f4());
})();

// ## QnA. 이제 비동기는 async/await로 제어할 수 있는데 왜 파이프라인이 필요한지?

function f5(list) {
  return go(
    list,
    L.map((a) => delayI(a * a)),
    L.filter((a) => delayI(a % 2)),
    L.map((a) => delayI(a + 1)),
    C.take(2),
    reduce((a, b) => delayI(a + b)),
  );
}

go(f5([1, 2, 3, 4, 5, 6, 7, 8]), (a) => log(a, 'f5'));

async function f6(list) {
  let temp = [];
  for (const a of list) {
    const b = await delayI(a * a);
    if (await delayI(b % 2)) {
      const c = await delayI(b + 1);
      temp.push(c);
      if (temp.length == 2) break;
    }
  }
  let res = temp[0],
    i = 0;
  while (++i < temp.length) {
    res = await delayI(res + temp[i]);
  }
  return res;
}

go(f6([1, 2, 3, 4, 5, 6, 7, 8]), log);

// ## QnA. async/await와 파이프라인을 같이 사용하기도 하나요?

async function f52(list) {
  const r1 = await go(
    list,
    L.map((a) => delayI(a * a)),
    L.filter((a) => delayI(a % 2)),
    L.map((a) => delayI(a + 1)),
    C.take(2),
    reduce((a, b) => delayI(a + b)),
  );

  const r2 = await go(
    list,
    L.map((a) => delayI(a * a)),
    L.filter((a) => delayI(a % 2)),
    reduce((a, b) => delayI(a + b)),
  );

  const r3 = await delayI(r1 + r2);

  return r3 + 10;
}

go(f52([1, 2, 3, 4, 5, 6, 7, 8]), (a) => log(a, 'f52'));

// ## QnA. 동기 상황에서 에러 핸들링은 어떻게 해야하는지?

/*function f7(list) {
    try {
      return list
        .map(a => JSON.parse(a))
        .filter(a => a % 2)
        .slice(0, 2);
    } catch (e) {
      log(e);
      return [];
    }
  }
  log(f7(['0', '1', '2', '{']));*/

// ## QnA. 비동기 상황에서 에러 핸들링은 어떻게 해야하는지?

/*async function f8(list) {
    try {
      return await list
        .map(async a => await new Promise(resolve => {
          resolve(JSON.parse(a));
        }))
        .filter(a => a % 2)
        .slice(0, 2);
    } catch (e) {
      // log(e, '----------------------');
      return [];
    }
  }
  f8(['0', '1', '2', '{']).then(log).catch(e => {
    log('에러 핸들링 하겠다.');
  });*/

// ## QnA. 동기/비동기 에러 핸들링에서의 파이프라인의 이점은?

async function f9(list) {
  try {
    return await go(
      list,
      map(
        (a) =>
          new Promise((resolve) => {
            resolve(JSON.parse(a));
          }),
      ),
      filter((a) => a % 2),
      take(2),
    );
  } catch (e) {
    return [];
  }
}

// f9(['0', '1', '2', '3', '4', '{']).then(a => log(a, 'f9')).catch(e => {
//   log('에러 핸들링 하겠다.', e);
// });

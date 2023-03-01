// ES6 이전의 리스트 순회 방식
const list = [1, 2, 3];
for (const i = 0; i < list.length; i++) {
  // log(list[i]);
}
const str = 'abc';
for (const i = 0; i < str.length; i++) {
  // log(str[i]);
}

// ES6부터 도입된 리스트 순회 방식
for (const a of list) {
  // log(a);
}
for (const a of str) {
  // log(a);
}

// Array에서의 이터러블/이터레이터
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator);
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

// Map에서의 이터러블/이터레이터
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
for (const a of map.keys()) log(a);
for (const a of map.values()) log(a);
for (const a of map.entries()) log(a);

// 이터러블/이터레이터 프로토콜
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0
          ? { value: undefined, done: true }
          : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

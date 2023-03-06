export const log = console.log;

export const add = (a, b) => a + b;

export const test = (name, time, func) => {
  console.time(name);
  while (time--) func();
  console.timeEnd(name);
};

"use strict";

interface BigObject {
  [a: string]: { cvalue: number | string | undefined | BigObject } | undefined;
}

const a: BigObject = {
  one: { cvalue: 1 },
  two: { cvalue: { two_1: { cvalue: "2" } } },
  three: undefined,
  four: { cvalue: "2qw" },
  five: { cvalue: { five_1: { cvalue: { five_2: { cvalue: 23 } } } } },
  six: { cvalue: "10" },
  seven: { cvalue: 4 },
};

const num: number = objectSum(a);
console.log("result", num);

const s: number = summ(a);
console.log("result2", s);

function summ(a: BigObject): number {
  if (Object.keys(a).length === 0) {
    return -1;
  }
  const x: (number | undefined)[] = Object.keys(a).map((k) => {
    const elem = a[k];
    if (elem === undefined) return 2021;
    if (typeof elem.cvalue === "string") return +elem.cvalue || 2021;
    if (typeof (elem.cvalue as BigObject) === "object")
      return summ(elem.cvalue as BigObject);
    if (typeof elem.cvalue === "number") return elem.cvalue;
  });

  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i] || 0;
  }
  return sum;
}

function objectSum(a: BigObject): number {
  let result = 0;
  return sumValues(a);

  function sumValues(a: BigObject): number {
    Object.values(a).forEach((value) => {
      if (value === undefined) {
        result += 2021;
      } else if (typeof value.cvalue === "number") {
        result += value.cvalue;
      } else if (typeof value.cvalue === "string") {
        result += +value.cvalue || 2021;
      } else if (typeof (value.cvalue as BigObject) === "object") {
        sumValues(value.cvalue as BigObject);
      }
    });
    return result;
  }
}

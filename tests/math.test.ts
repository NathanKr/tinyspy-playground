import { test, expect } from "vitest";
import * as math from "../src/math";
import * as mathOther from "../src/math-other";
import { spy, spyOn } from "tinyspy";

test("spy is a mock function", () => {
  // @ts-expect-error is not public
  expect(spy()._isMockFunction).toBe(true);
});

test("spyOn is a mock function", () => {
  // @ts-expect-error is not public
  expect(spyOn(math, "add2")._isMockFunction).toBe(true);
});

test("add(2,4) is 6", () => {
  expect(math.add2(2, 4)).toBe(6);
});

/**
 * using spyOn is not integrated to expect
 * so toBeCalledTimes is not supported in tineSpy
 */
test("toBeCalledTimes is not supported with spyOn math.add2", () => {
  const spiedAdd = spyOn(math, "add2");
  math.add2(2, 3);
  let canCallToBeCalledTimes = false;
  try {
    expect(spiedAdd).toBeCalledTimes(0);
    canCallToBeCalledTimes = true;
  } catch (error) {
    canCallToBeCalledTimes = false;
  }

  expect(canCallToBeCalledTimes).toBe(false);
});

test("spyOn is NOT working as expected with add4 \ add2 in the same module", () => {
  let spied = spyOn(math,'add2');
  const res = math.add4(1, 2, 3, 4);

  expect(res).toBe(10);
  expect(spied.called).toBe(false);
});

test("spyOn is working as expected with add4 \ add2 in different module", () => {
  let spied = spyOn(math,'add2');
  const res = mathOther.add4(1, 2, 3, 4);

  expect(res).toBe(10);
  expect(spied.called).toBe(true);
});


test("spyOn math.add2 is ok with tinyspy:SpyInternalState callCount", () => {
  const spiedAdd = spyOn(math, "add2");
  const addResult = math.add2(1, 2);

  expect(addResult).toBe(3);
  expect(spiedAdd.callCount).toBe(1);
});

/**
 * I was expecting fn to be called here but it is not working as expected
 */
test("spy is not working as expected", () => {
  let fn = spy(math.add2);
  const res = math.add4(1, 2, 3, 4);

  expect(res).toBe(10);
  // --- actually i am expecting it to be true , not clear why its false
  expect(fn.called).toBe(false);
});

test('add4PassAdd is ok',()=>{
  expect(math.add4PassAdd(10,20,30,40,math.add2)).toBe(100)
})

test('spy is working as expected with callback',()=>{
  let fn = spy(math.add2);
  expect(math.add4PassAdd(10,20,30,40,fn)).toBe(100);
  expect(fn.called).toBe(true); 
})


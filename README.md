<h2>Introduction</h2>
tinyspy is a mock library used by vitest

<h2>Motivation</h2>
I have run time understanding how to use vi.spyOn and vi.fn in vitest. vitest uses tinyspy for mocking so understanding tinyspy may help

<h2>Use cases</h2>
You can see the use cases nicely via the test of tinyspy <a href='https://github.com/tinylibs/tinyspy/tree/main/test'>here</a> 
<ol>
<li>function - <a href='https://github.com/tinylibs/tinyspy/blob/main/test/index.test.ts'>index.test.ts</a></li>
<li>object with function  - <a href='https://github.com/tinylibs/tinyspy/blob/main/test/index.test.ts'>index.test.ts</a></li>
<li>class - <a href='https://github.com/tinylibs/tinyspy/blob/main/test/class.test.ts'></a>class.test.ts</li>
<li>module - <a href='https://github.com/tinylibs/tinyspy/tree/main/test/mod'>mod</a></li>
</ol>

<h2>API</h2>
<ol>
<li><h3>spy</h3>

<h4>Usage</h4>

```ts
test("spy is working as expected with callback", () => {
  let fn = spy(math.add2);
  expect(math.add4PassAdd(10, 20, 30, 40, fn)).toBe(100);
  expect(fn.called).toBe(true);
});
```

<h4>Type</h4>

```ts
function spy<A extends any[], R>(
  cb?:
    | ((...args: A) => R)
    | {
        new (...args: A): R;
      }
): SpyFn<A, R>;
```

</li>
<li><h3>spyOn</h3>

<h4>Usage</h4>

```ts
test("spyOn is working as expected with add4 \ add2 in different module", () => {
  let spied = spyOn(math,'add2');
  const res = mathOther.add4(1, 2, 3, 4);

  expect(res).toBe(10);
  expect(spied.called).toBe(true);
});
```

<h4>Type</h4>

There are few override for spyOn but this is one of them

```ts
function spyOn<T, M extends Methods<Required<T>>>(
  obj: T,
  methodName: M,
  mock?: T[M]
): Required<T>[M] extends (...args: infer A) => infer R ? SpyImpl<A, R> : never;
```

</li>
</ol>

<h2>Open issues</h2>
<ul>
<li>

```ts
test("spyOn is NOT working as expected with add4 \ add2 in the same module", () => {
  let spied = spyOn(math,'add2');
  const res = math.add4(1, 2, 3, 4);

  expect(res).toBe(10);
  expect(spied.called).toBe(false);
});

```
</li>

<li>

```ts
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

```

</li>
</ul>

<h2>Points of interests</h2>
<ul>
<li>The api here : spy and spyOn is used to implement in vitest : vi.fn , vi.spyOn , vi.mock</li>
</ul>

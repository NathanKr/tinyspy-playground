export function add2(n1: number, n2: number): number {
  return n1 + n2;
}

export function add4(n1: number, n2: number, n3: number, n4: number): number {
  return add2(n1, n2) + add2(n3, n4);
}

export function add4PassAdd(
  n1: number,
  n2: number,
  n3: number,
  n4: number,
  _add2: (n1: number, n2: number) => number
): number {
  return _add2(n1, n2) + _add2(n3, n4);
}

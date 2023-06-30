import { add2 } from "./math";

export function add4(n1: number, n2: number, n3: number, n4: number): number {
  return add2(n1, n2) + add2(n3, n4);
}
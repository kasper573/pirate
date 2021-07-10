export function typedAssign<T>(target: T, assign: Partial<T>): T {
  Object.assign(target, assign);
  return target;
}

export function assertDefined<T>(
  value: T | null | undefined,
): asserts value is T {
  if (!value) {
    throw new Error('Expected value to be truthy, but received ' + value);
  }
}

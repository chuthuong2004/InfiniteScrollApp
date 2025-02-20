export function removePropertyUndefined<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

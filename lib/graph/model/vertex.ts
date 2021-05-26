export interface vertex<T> {
  value: T,
  color: string,
  pi: vertex<T>,
  distance: number,
  f: number,
  key: number
}

export default function createVertex<T> (value: T): vertex<T> {
  return {
    value,
    color: 'WHITE',
    pi: undefined,
    distance: Number.POSITIVE_INFINITY,
    f: Number.POSITIVE_INFINITY,
    key: Number.POSITIVE_INFINITY
  }
}

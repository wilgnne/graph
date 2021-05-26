import { vertex } from './vertex'

export interface egde<T> {
  from: vertex<T>,
  to: vertex<T>,
  weight: number
}

export default function createEdge<T> (from: vertex<T>, to: vertex<T>, weight: number) {
  return {
    from,
    to,
    weight
  }
}

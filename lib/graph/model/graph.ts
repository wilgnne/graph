import { egde } from './edge'
import { vertex } from './vertex'

export default abstract class Graph<T> {
  isDirected: boolean

  addVertex: (u: T) => void
  removeVertex: (u: T) => void
  addEdge: (u: T, v: T, weight: number) => void
  removeEdge: (u: T, v: T, weight: number) => void
  adjacent: (u: T | vertex<T>) => egde<T>[]
  vertices: () => vertex<T>[]
  edges: () => egde<T>[]

  /**
   * Calcula o grau de entrada de um vertice u
   *
   * O grau de entrada de um vertice e representado pelo
   * numero de arestas que incidem sobre ele
   * @param u valor do vertice
   */
   inputDegree = (u: T) => {
     return this.edges().reduce((prev, curr) => {
       if (curr.to.value === u) return prev + 1
       return prev
     }, 0)
   }

  /**
   * Calcula o grau de saida de um vertice u
   *
   * O grau de saida de um vertice e representado pelo
   * numero de arestas partem dele
   * @param u valor do vertice
   */
  outputDegree = (u: T) => {
    return this.adjacent(u).length
  }

  /**
   * Retorna uma lista de valores de vertices que são fontes do grafo
   *
   * Uma fonte e um vertice que possui o grau de entrada igual a 0
   */
  sources = () => {
    // Para cada vertice do grafo,
    // caso o grau de entrada o vertice seja 0,
    // adicionamos o vertice a lista de fontes
    return this.vertices().filter(vertex => this.inputDegree(vertex.value) === 0).map(vertex => vertex.value)
  }

  /**
   * Retorna uma lista de valores de vertices que são drenos do grafo
   *
   * Um dreno e um vertice que possui o grau de saida igual a 0
   */
  drain = () => {
    // Para cada vertice do grafo,
    // caso o grau de saida o vertice seja 0,
    // adicionamos o vertice a lista de drenos
    return this.vertices().filter(vertex => this.outputDegree(vertex.value) === 0).map(vertex => vertex.value)
  }
}

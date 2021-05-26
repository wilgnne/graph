import createEdge, { egde } from './model/edge'
import Graph from './model/graph'
import createVertex, { vertex } from './model/vertex'

export default class AdjacencyList<T> extends Graph<T> {
  adjList: Map<vertex<T>, egde<T>[]>
  isDirected: boolean

  /**
   * Adiconar um vertice ao grafo
   * @param u valor do novo vertice
   */
  addVertex = (u: T) => {
    // Obtem a lista de chaves do dicionario
    // Referencia direta aos vertices do grafo
    const vertices = this.vertices()
    // Se não existir um vertice cujo valor seja igual ao valor do novo nodo
    let U = vertices.find(vertex => vertex.value === u)
    if (U === undefined) {
      // Instanciamos um novo vertice com o valor desejado
      U = createVertex(u)
      // Adicionamos o mesmo ao dicionario junto a sua lista de arestastas
      this.adjList.set(U, [])
    }
  }

  /**
   * Remover um vertice do grafo
   * @param u valor do vertice a ser removido
   */
  removeVertex = (u: T) => {
    // Obtem a lista de chaves do dicionario
    // Referencia direta aos vertices do grafo
    const vertices = this.vertices()
    // Encontramos o vertice que desejamos remover
    const U = vertices.find(vertex => vertex.value === u)
    // Se tal vertice existe
    if (U) {
      // Para cada lista de adjacencia dos vertices do grafo
      Array.from(this.adjList.values()).forEach(edges => {
        // Procuramos uma aresta cujo nodo seja o vertice que queremos remover
        const edgeToRemoveIndex = edges.findIndex(edge => edge.to === U)
        // Removemos a aresta
        edges.splice(edgeToRemoveIndex, 1)
      })
      // Removemos o vertice da lista de nodos do grafo
      this.adjList.delete(U)
    }
  }

  /**
   * Adiciona uma aresta entre dois vertices pré-existentes
   *
   * Caso o grafo não seja direcionado esta função tera o efeito de
   * AddEdge (u, v); AddEdge(v, u);
   *
   * exerto caso u == v
   * @param u valor do vertice de origem U
   * @param v valor do vertice de destino V
   * @param weight peso da aresta
   */
  addEdge = (u: T, v: T, weight = 1) => {
    // Obtem a lista de vertices do grafo
    const vertices = this.vertices()

    // Encontramos o vertice U
    const U = vertices.find(vertex => vertex.value === u)
    // Encontramos o vertice V
    const V = vertices.find(vertex => vertex.value === v)

    // Se existe um vertice cujo valor e igual a u, e um vertice cujo valor e igual a v
    if (U && V) {
      // Instanciamos uma aresta entre U e V com o peso passado por paramentro
      const UtoV = createEdge(U, V, weight)
      // Adicionamos a nova aresta a lista de adjacencia de U
      const adjU = this.adjList.get(U)
      if (adjU.includes(UtoV) === false) {
        adjU.push(UtoV)
      }

      // Se o grafo não for direcionado e o U e V não forem o mesmo vertice
      if (this.isDirected === false && (U === V) === false) {
        // Instanciamos uma aresta entre V e U com o peso passado por paramentro
        const VtoU = createEdge(V, U, weight)
        // Adicionamos a nova aresta a lista de adjacencia de V
        const adjV = this.adjList.get(V)
        if (adjV.includes(VtoU) === false) {
          adjV.push(VtoU)
        }
      }
    }
  }

  /**
   * Remove uma aresta entre dois vertices pré-existentes de peso weight
   * @param u valor do vertice de origem U
   * @param v valor do vertice de destino V
   * @param weight
   */
  removeEdge = (u: T, v: T, weight = 1) => {
    // Obtem a lista de vertices do grafo
    const vertices = this.vertices()

    // Encontramos o vertice U
    const U = vertices.find(vertex => vertex.value === u)
    // Encontramos o vertice V
    const V = vertices.find(vertex => vertex.value === v)

    // Se existe um vertice cujo valor e igual a u, e um vertice cujo valor e igual a v
    if (U && V) {
      // Removemos da lista de adjacencia de U o vertice que possui destino V e peso weight
      const UEdges = this.adjacent(u)
      const UtoVIndex = UEdges.findIndex(edge => (edge.to === V) && edge.weight === weight)
      this.adjList.get(U).splice(UtoVIndex, 1)
      // Se o grafo não for direcionado
      if (this.isDirected === false) {
        // Removemos da lista de adjacencia de V o vertice que possui destino U e peso weight
        const VEdges = this.adjacent(v)
        const VtoUIndex = VEdges.findIndex(edge => (edge.to === U) && edge.weight === weight)
        this.adjList.get(V).splice(VtoUIndex, 1)
      }
    }
  }

  /**
   * Retorna a lista de vertices adjacentes a U
   * @param u valor do vertice U
   */
  adjacent = (u: T) => {
    const U = this.vertices().find(vertex => vertex.value === u)
    return this.adjList.get(U)
  }

  /**
   * Retorna a lista de vertices do grafo
   */
  vertices = () => Array.from(this.adjList.keys())

  /**
   * Retorna a lista de arestas do grafo
   */
  edges = () => Array.from(this.adjList.values()).reduce((a, b) => a.concat(b), []).sort((a, b) => a.weight - b.weight)
}

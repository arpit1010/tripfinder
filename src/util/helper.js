import PriorityQueue from './pq'

const runDijkstra=(Graph, from ,to)=> {
    let nodes = new PriorityQueue();
    let dist = {};
    let prev = {};
    let refTripMap = {};

    for (let vertex in Graph) {
      if (Graph.hasOwnProperty(vertex)) {
        if (vertex === from) {
          dist[vertex] = 0;
          nodes.add(vertex, 0);
        } else {
          dist[vertex] = Infinity;
          nodes.add(vertex, Infinity);
        }
        prev[vertex] = null;
      }
    }

    while(!nodes.isEmpty()) {
      let u = nodes.ejectSmallest();

      if (u === to) break;

      if (!u || dist[u] === Infinity) continue;

      for (let v in Graph[u]) {
        if (Graph[u].hasOwnProperty(v)) {
          const alt = dist[u] + Graph[u][v].weight;
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;
            nodes.add(v, alt);
            refTripMap[`${u}-${v}`] = Graph[u][v].ref;
          }
        }
      }
    }

    return { prev, refTripMap }
  }

  const bestPath=(dijkstraOutput, to) =>{
    let trips = [];
    let arrival = to;
    let departure = dijkstraOutput.prev[arrival];

    while (departure) {
      trips.push(dijkstraOutput.refTripMap[`${departure}-${arrival}`]);
      arrival = departure;
      departure = dijkstraOutput.prev[departure];
    }

    return trips.reverse();
  }

export const shortestPathalgo = (originalArray,state)=>{
let graphVertex = {};
originalArray.forEach(element => {
    const from = element.departure;
      const to = element.arrival;
      const ref = element.reference;
      const cost  = element.cost * (1 - (element.discount / 100));
      const time  = parseInt(element.duration.h + element.duration.m, 10);
      let weight  = 0;
      switch (state.tabvalue) {
        case 0:
          weight = cost;
          break;
        case 1:
          weight = time;
          break;
        default:
          throw new Error('Unsupported trip type')
      }
      if(!graphVertex[from]){
          graphVertex[from] = [];
      }
      if(!graphVertex[from][to] || weight < graphVertex[from][to].weight){
        graphVertex[from][to] = { weight, ref };
      } 

    
});
const djikstraresult = runDijkstra(graphVertex,state.selectedDeparture,state.selectedArrival);

let ref= bestPath(djikstraresult,state.selectedArrival);
let tripsArray = []
ref.forEach(element=>{
    tripsArray.push(state.referencemap.get(element));
})
return tripsArray;
}

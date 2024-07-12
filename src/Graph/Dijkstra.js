import BinHeap from '../Binary Search Stuff/BinaryHeap';

const less_than = (x, y) => {
    return x[0] < y[0];
}

const executeDijkstra = (start, end, positions, edges) => {
    let dist = [];
    let pred = [];
    let visited = [];
    let visitedUntil = [];
    let Q = new BinHeap(less_than);

    let s = edges.length;

    for (let i = 0; i < s; i++){
        edges.push(edges[i].toReversed());
    }

    for (let i = 0; i < Object.keys(positions).length; i++){
        dist.push(Infinity);
        pred.push(null);
    }

    dist[start] = 0;
    Q.insert([0, start])

    let found = false;

    while(Q.data.length > 0) {
        let v = Q.find_min()[1];
        Q.remove_min();

        if (visited.indexOf(v) == -1) {
            visited.push(v);

            if (v == end){
                found = true;
            }
            if (!found) {
                visitedUntil.push(v);
            }

            let adj = edges.filter(edge => edge[0] == v);

            for (let i = 0; i < adj.length; i++){

                let deltaX = positions[v].x - positions[adj[i][1]].x;
                let deltaY = positions[v].y - positions[adj[i][1]].y;
                let length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (dist[v] + length < dist[adj[i][1]]) {
                    dist[adj[i][1]] = dist[v] + length;
                    pred[adj[i][1]] = v;
                    Q.insert([dist[adj[i][1]], adj[i][1]])
                }
            }
        }
    }

    return {distances:dist,
            prevs:pred,
            vis:visitedUntil};
}

export default executeDijkstra;
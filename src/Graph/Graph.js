
class Graph {
    constructor(size){
        this.mat = [];
        this.size = size;
        for(let i = 0; i < size; i++){
            this.mat.push([])
            for(let j = 0; j < size; j++){
                this.mat[i].push(-1);
            }
        }

    }

    add_edge(to, from, dist) {
        this.mat[to][from] = dist;
        this.mat[from][to] = dist;
    }

    get_dist(to,from) {
        return this.mat[to][from];
    }

    get_adj(to) {
        adj = [];
        for(let i = 0; i < this.size; i++){
            if (this.mat[to][i] !== -1){
                adj.push(i);
            }
        }
        return adj;
    }

    get_edges() {
        let edges = [];
        for(let i = 0; i < this.size; i++){
            for(let j = i; j < this.size; j++){
                if (this.mat[i][j] !== -1){
                    edges.push([i, j, this.mat[i][j]]);
                }
            }
        }
        return edges;
    }
}

export default Graph;
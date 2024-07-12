class BinHeap{
    constructor(func) {
        this.data = [];
        this.size = this.data.length
        this.func = func;
    }

    find_min() {
        return this.data[0];
    }

    swap(first, second) {
        let temp = this.data[first];
        this.data[first] = this.data[second];
        this.data[second] = temp;
    }

    percolate(i) {
        let less = i;

        if (this.func(this.data[2*i+1], this.data[2*i+2])){
            less = 2*i+1;
        } else {
            less = 2*i+2;
        }

        if (this.func(this.data[less], this.data[i])){
            this.swap(i, less);
        }

        return less;
    }

    remove_min() {
        let i = 0;
        this.swap(i, this.data.length - 1);
        this.data.splice(this.data.length - 1, 1);

        while (2*i+2 < this.data.length){
            let new_i = this.percolate(i);
            if (new_i === i) 
                break;
            i = new_i;
        }

        if (2*i+1 < this.data.length && this.func(this.data[2*i+1], this.data[i])){
            this.swap(2*i+1, i);
            i = 2*i+1;
        }
    }

    insert(x) {
        this.data.push(x);
        let i = this.data.length - 1;

        while (this.func(this.data[i], this.data[Math.trunc((i-1)/2)]) && i != 0){
            this.swap(i, Math.trunc((i-1)/2));
            i = Math.trunc((i-1)/2);
        }
    }
}

export default BinHeap;
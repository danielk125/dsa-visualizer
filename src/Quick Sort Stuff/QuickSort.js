
class QS{

    constructor() {
        this.arr = this.rand_build();
        this.pivot = this.arr.length - 1;
        this.states = [];
    }

    rand_build(){
        let arr = [];
    
        for (let i = 0; i < 10; i++){
            arr[i] = Math.floor(Math.random() * 20) + 1;
        }
    
        return arr;
    }

    quick_sort(arr, start, end, lor){
        if(end <= start)
            return;
        let pivot = this.partition(arr, start, end, lor);
        this.quick_sort(arr, start, pivot - 1, true);
        this.quick_sort(arr, pivot + 1, end, false);
    }

    partition(arr, start, end, lor){
        let _pivot = arr[end];
        let _i = start - 1;
        let _j = start
        
        for(_j; _j < end; _j++){
            if(arr[_j] < _pivot && _i !== _j) {
                _i++;
                let temp = arr[_i];
                arr[_i] = arr[_j];
                arr[_j] = temp;
                this.states.push({
                    i:_i,
                    j:_j,
                    pivot:end,
                    array:[...arr],
                    swap:true
                });
            }else {
                this.states.push({
                    i:_i,
                    j:_j,
                    pivot:end,
                    array:[...arr],
                    swap:false
                });
            }
        }

        _i++;
        let temp = arr[_i];
        arr[_i] = arr[end];
        arr[end] = temp;

        this.states.push({
            i:_i,
            j:_j,
            pivot:end,
            array:[...arr],
            swap:true
        });

        return _i;

    }

}

export default QS;
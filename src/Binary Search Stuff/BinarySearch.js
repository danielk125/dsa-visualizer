
class BNS{
    constructor() {
        this.arr = this.rand_build();
        this.guess = Math.floor(Math.random() * 20) + 1;
        this.min = 0;
        this.max = this.arr.length-1;
        this.mid = Math.floor((this.max + 0) / 2);
        this.message = "hello world";
    }

    rand_build(){
        let arr = [];
    
        for (let i = 0; i < 10; i++){
            arr[i] = Math.floor(Math.random() * 20) + 1;
        }
    
        arr.sort((a,b) => {
            return a - b;
        });
    
        return arr;
    }

    step(){
        this.mid = Math.floor((this.min + this.max) / 2);
    
        if (this.guess == this.arr[this.mid]){
            return true;
        } else if (this.guess > this.arr[this.mid]){
            this.min = this.mid + 1;
        } else {
            this.max = this.mid - 1;
        }
    
        return false;
    }

}

export default BNS;

function search(val, arr) {
    let min = 0;
    let max = arr.length - 1;

    while (min <= max){
        let mid = Math.floor((min + max) / 2);

        if (val == arr[mid]){
            return true;
        } else if (val > arr[mid]){
            min = mid + 1;
        } else {
            max = mid - 1;
        }
    }

    return false;
}

function step_search(val,arr){
    let min = 0;
    let max = arr.length - 1;

    let found = false;

    while(min <= max && !(found)){

        let mid = Math.floor((min + max) / 2);

        console.log("min: " + min);
        console.log("mid:" + mid);
        console.log("max:" + max);

        let res = step(min,max,val,arr);
        min = res[0];
        max = res[1];
        mid = res[2];
        found = res[3];
    }

    return found

}


import BNS from './BinarySearch';

function Vis_array(props){

    const cur_search = props.search;

    const arr = cur_search.arr;

    const arr_items = arr.map(item => <li>{item}</li>);
    
    return <ol>{arr_items}</ol>;
}

export default Vis_array;
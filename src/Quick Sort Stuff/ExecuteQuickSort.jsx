import QS from './QuickSort.js';
import React, { useState, useRef, useEffect, createRef } from 'react';  
import Box from '../Box.jsx';

function ExecuteQS(){
    const [test, setTest] = useState(() => new QS());
    const [arr, setArr] = useState(() => test.arr);
    const [done, setDone] = useState(false);
    const boxRefs = useRef(test.arr.map(() => createRef()));

    useEffect(() => {
        setArr(test.arr);
    }, [test]);  // Update arr whenever test changes

    const animateRefTwo = (index, animationType) => {
        const ref = boxRefs.current[index];
        if (ref && ref.current) {
            ref.current.animateBoxTwo(animationType);
        }
    };
    
    const animateRef = (index, animationType) => {
        const ref = boxRefs.current[index];
        if (ref && ref.current) {
            ref.current.animateBox(animationType);
        }
    };
    

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSort(){
        test.quick_sort(test.arr,0,9,false);
        let states = test.states;
        console.log(states);

        for(let x = 0; x < states.length; x++){
            
            
            if(states[x].swap){
                animateRefTwo(states[x].j, "animateMax")
                animateRefTwo(states[x].i, "animateMin")
                animateRefTwo(states[x].pivot, "animateMid")
                await sleep(1000);
                setArr(arr => [...states[x].array]);
                await sleep(1000);
            } else {
                animateRef(states[x].j, "animateMax")
                animateRef(states[x].i, "animateMin")
                animateRef(states[x].pivot, "animateMid")
                await sleep(1000);
            }
            
        }

        setDone(true);
    }

    const handleReset = () => {
        setTest(new QS());
        setDone(false);
    }


    return (
        <div className="app_container">
            <div className="title">
                <h1 style={{ fontSize: '76px'}}>Quick Sort Algorithm</h1>
            </div>
            <div className="key_container">
                
                <div className="blueBox"></div>
                <h2>= &nbsp;i,</h2>
                <div className="redBox"></div>
                <h2>= &nbsp;j,</h2>
                <div className="purpleBox"></div>
                <h2>= &nbsp;pivot</h2>
            </div>  
            <div className="container">
                {arr.map((value, index) => (
                    <Box ref={boxRefs.current[index]} key={index} val={value} />
                ))}
                
            </div>
            <div className="guess_container">
                {!done ? (
                    <button onClick={handleSort} >Run Sort</button>
                ) : (
                    <button onClick={handleReset} >Reset</button>
                )}
                
            </div>
            
        </div>
    );
}

export default ExecuteQS;
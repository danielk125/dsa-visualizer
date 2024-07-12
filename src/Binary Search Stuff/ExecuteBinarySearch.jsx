import BNS from './BinarySearch.js';
import React, { useState, useRef, useEffect, createRef } from 'react';  
import Box from '../Box.jsx';

function ExecuteBNS(){
    const [test, setTest] = useState(() => new BNS());
    const [found, setFound] = useState(false);  // Added state to track if the value has been found
    const [notFound, setNotFound] = useState(false);
    const boxRefs = useRef(test.arr.map(() => createRef()));

    const handleStep = () => {
        const animateRef = (index, animationType) => {
            const ref = boxRefs.current[index];
            if (ref && ref.current) {
                ref.current.animateBox(animationType);
            }
        };

        animateRef(test.min, "animateMin");  // Animate the min element
        animateRef(test.max, "animateMax");  // Animate the max element


        const found = test.step(); // Execute step and get true/false if found
        
        if (test.arr[test.mid] === test.guess){
            animateRef(test.mid, "animateMid");
            setFound(true);
            return;
        }
        if(test.min > test.max){
            setNotFound(true)
            return;
        }

        animateRef(test.mid, "animateMid");
    }
    
    const handleReset = () => {
        setTest(new BNS());  // Reset the test to a new instance of BNS
        setFound(false);  // Reset the found flag
        setNotFound(false);
    }
    
    return (
        <div className="app_container">
            <div className="title">
                <h1 style={{ fontSize: '76px'}}>Binary Search Algorithm</h1>
            </div>
            
            <div className="key_container">
                
                <div className="blueBox"></div>
                <h2>= &nbsp;min,</h2>
                <div className="purpleBox"></div>
                <h2>= &nbsp;mid,</h2>
                <div className="redBox"></div>
                <h2>= &nbsp;max</h2>
            </div>  
            <div className="container">
                {test.arr.map((value, index) => (
                    <Box ref={boxRefs.current[index]} key={index} val={value} />
                ))}
                
            </div>
            <div className="guess_container">
                <div className="interact">
                    {found || notFound ? (
                            <button onClick={handleReset}>Reset</button>
                        ) : (
                            <>
                                <button onClick={handleStep}>Step</button>
                            </>
                    )}
                </div>
                {found ? (
                        <h1>Found!</h1>
                    ) : (notFound ? (
                        <h1>Not Found!</h1>
                    ) : (
                        <>
                            <h1>Target: </h1>
                            <div className="guess">
                                <Box val={test.guess} />
                            </div>
                        </>
                ))}
            </div>
        </div>
    );
}

export default ExecuteBNS;
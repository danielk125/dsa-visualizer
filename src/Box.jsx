import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';

const Box = forwardRef((props, ref) => {
    const num = props.val;

    const [className, setClassName] = useState("");

    const boxRef = useRef(null);

    useImperativeHandle(ref, () => ({
        animateBox(animation) {
            if (boxRef.current) {
                boxRef.current.classList.add(animation);
                setTimeout(() => {
                    boxRef.current.classList.remove(animation);
                }, 1000); // Assumption: animation duration is 500ms
            }
        },
        animateBoxTwo(animation) {
            if (boxRef.current) {
                boxRef.current.classList.add(animation);
                setTimeout(() => {
                    boxRef.current.classList.remove(animation);
                }, 2000);
            }
        },
        animateBoxThree(animation) {
            if (boxRef.current) {
                boxRef.current.classList.add(animation);
                setTimeout(() => {
                    boxRef.current.classList.add('animatePivot');
                    boxRef.current.classList.remove(animation);
                }, 2000);
            }
        },
        animateBoxFour(animation) {
            if (boxRef.current) {
                boxRef.current.classList.add(animation);
                setTimeout(() => {
                    boxRef.current.classList.add('animatePivot');
                    boxRef.current.classList.remove(animation);
                }, 1000);
            }
        }
    }));

    return(
        <div ref={boxRef} className="box">
            <h1>{num}</h1>
        </div>
    );
});

export default Box;
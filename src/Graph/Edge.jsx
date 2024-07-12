import React from 'react';

const Edge = ({ from, to }) => {

    const deltaX = to.x - from.x;
    const deltaY = to.y - from.y;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    const edgeStyle = {
        position: 'absolute',
        width: `${length}px`,
        height: '3px',
        backgroundColor: 'rgba(237, 237, 237, 1)',
        transformOrigin: '0 0',
        top: `${from.y}px`,
        left: `${from.x}px`,
        transform: `rotate(${angle}deg)`
    };

    return <div style={edgeStyle}></div>;
};

export default Edge;
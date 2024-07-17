import React, { useEffect, useState } from 'react';

const Vertex = ({ id, position, onStartDrag, onClick, className }) => {


    const handleClick = () => {
        
        onClick(id); // Call the onClick function passed from the parent component

    };

    
    // Style for the vertex div
    const vertexStyle = {
        position: 'absolute',
        top: `${position.y - 40}px`,
        left: `${position.x - 40}px`,
    };


    return (
        <div className={className}
             style={vertexStyle}
             onMouseDown={onStartDrag ? (e) => onStartDrag(e, id) : undefined}
             onClick={handleClick}>
            <p>{id}</p>
        </div>
    );
};

export default Vertex;
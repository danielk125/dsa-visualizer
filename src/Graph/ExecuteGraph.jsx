import React, { useState, useCallback, useEffect } from 'react';
import Vertex from '../Vertex';
import Edge from './Edge';
import executeDijkstra from './Dijkstra';

const GraphComponent = ({ graph }) => {
    const [activeState, setActiveState] = useState('mobile');
    const [positions, setPositions] = useState({});
    const [edges, setEdges] = useState(graph.get_edges());
    const [selectedVertices, setSelectedVertices] = useState([]);
    const [vertexOrder, setVertexOrder] = useState([]); 
    const [isDragging, setIsDragging] = useState(false);
    const [draggedVertex, setDraggedVertex] = useState(null);
    const [initialPosition, setInitialPosition] = useState(null);
    const [algFirst, setAlgFirst] = useState(null);
    const [algSecond, setAlgSecond] = useState(null);
    const [vis, setVis] = useState([]);
    const [path, setPath] = useState([]);


    const handleVertexClick = useCallback((id) => {

        
        if(activeState === 'mobile'){
            setSelectedVertices(prev => {
                const newSelection = prev.includes(id) ? prev.filter(vid => vid !== id) : [...prev, id];

                if (newSelection.length === 2) {
                    const [first, second] = newSelection;
                    
                    setEdges(prevEdges => {
                        const edgeExists = prevEdges.some(edge => 
                            (edge[0] === first && edge[1] === second) || 
                            (edge[0] === second && edge[1] === first)
                        );
    
                        if (edgeExists) {
                            return prevEdges.filter(edge => 
                                !(edge[0] === first && edge[1] === second) && 
                                !(edge[0] === second && edge[1] === first)
                            );
                        } else {
                            return [...prevEdges, [first, second]];
                        }
                    });
                    return [];
                }
                return newSelection;
            });
        } else if (activeState === 'fixed') {

            if (algFirst === null){
                setAlgFirst(id);
            } else if (algSecond === null && id != algFirst) {
                setAlgSecond(id);
            }
        }    
        
    }, [activeState, setEdges, algFirst, algSecond]);

    const resetAlg = () => {
        setAlgFirst(null);
        setAlgSecond(null);
        setVis([]);
        setPath([]);
    }

    const handleMouseDown = useCallback((event, id) => {
        setIsDragging(true);
        setDraggedVertex(id);
        setInitialPosition(positions[id]);
        event.preventDefault();
    }, [positions]);

    const handleMouseMove = useCallback((event) => {
        if (isDragging) {
            const newX = event.clientX;
            const newY = event.clientY;
            
            setPositions(prevPositions => {
                const currentPos = prevPositions[draggedVertex];
                if (currentPos && (currentPos.x !== newX || currentPos.y !== newY)) {
                    return {
                        ...prevPositions,
                        [draggedVertex]: { x: newX, y: newY }
                    };
                }
                return prevPositions;
            });
        }
        event.preventDefault();
    }, [isDragging, draggedVertex]);

    const handleMouseUp = useCallback((event) => {
        if (isDragging) {
            const currentPosition = positions[draggedVertex];
            if (!(initialPosition && (initialPosition.x === currentPosition.x && initialPosition.y === currentPosition.y))) {
                handleVertexClick(draggedVertex);
            }
        }
        setIsDragging(false);
        setDraggedVertex(null);
        setInitialPosition(null);
        event.preventDefault();
    }, [isDragging, draggedVertex, initialPosition, positions, handleVertexClick]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleAddVertex = () => {
        const newId = Object.keys(positions).length;
        setPositions(prev => ({
            ...prev,
            [newId]: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        }));
        setVertexOrder(prev => [...prev, newId]);
    };

    const handleRemoveVertex = () => {
        setVertexOrder(prevOrder => {
            const newOrder = [...prevOrder];
            const vertexToRemove = newOrder.pop();

            if (vertexToRemove !== undefined) {
                setPositions(prevPositions => {
                    const { [vertexToRemove]: _, ...newPositions } = prevPositions;
                    return newPositions;
                });
                setEdges(prevEdges => prevEdges.filter(edge => edge[0] != vertexToRemove && edge[1] != vertexToRemove));
            }

            return newOrder;
        });
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleDijkstra() {
        let res = executeDijkstra(algFirst, algSecond, positions, edges.slice())

        let dist = res.distances;
        let pred = res.prevs;
        let visited = res.vis;

        for (let i = 1; i < visited.length; i++){
            await sleep(1000);
            if (visited[i] != algSecond){
                setVis(prev => {
                    return [...prev, visited[i]];
                });
            }
            
        }
        
        let i = algSecond;

        if(pred[i] != null){
            await sleep(1000);
        setPath(prev => {
            return [...prev, i];
        });

        while (i != algFirst){
            await sleep(1000);
            setPath(prev => {
                return [...prev, i];
            });
            i = pred[i]
        }
        }
    }
    

    return (
        <div className='container'>
            {activeState === 'mobile' ? (
                <div className='info_box'>
                    <h1 style={{ fontSize: '26px'}}>Graph</h1>
                    <p style={{ fontSize: '14px', textAlign: 'center'}}>Use the buttons at the top of the page to build your own graph! Drag added vertices anywhere on the page. Click any two vertices to add or remove an edge between them.</p>
                </div>
            ) : (
                <div className='info_box'>
                    <h1 style={{ fontSize: '26px'}}>Dijkstra's Algorithm</h1>
                    <p style={{ fontSize: '14px', textAlign: 'center'}}>Dijkstra's algorithm is a graph search algorithm that finds the shortest path between vertices in a graph. Select 'start' and 'target' vertices by clicking any two vertices.</p>
                    <div className="key_container">
                        <div className="purpleBox"></div>
                        <p style={{ fontSize: '14px', textAlign: 'center'}}>=&nbsp;&nbsp;&nbsp;visited</p>
                        <div className="greenBox"></div>
                        <p style={{ fontSize: '14px', textAlign: 'center'}}>=&nbsp;&nbsp;&nbsp;path</p>
                    </div> 
                </div>
            )}
            
            {activeState === 'mobile' ? (
                <div className='navBar'>
                    <button onClick={() => setActiveState('fixed')}>Run Algorithm</button>
                    <button onClick={handleAddVertex}>Add Vertex</button>
                    <button onClick={handleRemoveVertex}>Remove Last Vertex</button>
                    
                </div>
            ) : (
                <div className='navBar'>
                    <button onClick={() => {setActiveState('mobile');
                                            resetAlg();
                                            setVis([]);
                                            setPath([]);
                                            setSelectedVertices([]);
                                            }}>Edit Graph</button>
                    <button onClick={resetAlg}>Clear Selection</button>
                    <button onClick={handleDijkstra}>Execute Dijkstra's Algorithm</button>
                </div>
            )}
            {edges.map((edge, index) => {
                const fromPosition = positions[edge[0]];
                const toPosition = positions[edge[1]];
                if (fromPosition && toPosition) {
                    return (
                        <Edge key={`${edge[0]}-${edge[1]}-${index}`} from={fromPosition} to={toPosition} />
                    );
                }
                return null;
            })}
            {
                activeState === "mobile" ? (
                    Object.keys(positions).map(id => (
                        <Vertex
                            key={id}
                            id={id}
                            position={positions[id]}
                            onStartDrag={(event) => handleMouseDown(event, id)}
                            onClick={handleVertexClick}
                            className={'vertex'}
                        />
                    ))
                ) : (
                    Object.keys(positions).map(id => (
                        <Vertex
                            key={id}
                            id={algFirst === id ? 'start' : (algSecond === id ? 'target' : id)}
                            position={positions[id]}
                            onClick={handleVertexClick}
                            className={
                                `vertex ${algFirst === id ? 'alg-first' : ''} ${algSecond === id ? 'alg-second' : ''} ${vis.indexOf(id) > -1 ? 'alg-visited' : ''} ${path.indexOf(id) > -1 ? 'alg-path' : ''}`
                            }
                        />
                    ))
                )
            }
            
        </div>
    );
};

export default GraphComponent;

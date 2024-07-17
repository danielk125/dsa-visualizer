import React, { useState } from 'react';
import Card from './HomeCard.jsx';
import bns from './Binary Search Stuff/bns.png';
import ExecuteBNS from './Binary Search Stuff/ExecuteBinarySearch.jsx';
import ExecuteQS from './Quick Sort Stuff/ExecuteQuickSort.jsx';
import qs from './Quick Sort Stuff/QS.png';
import graph from './Graph/graph.png';
import GraphComponent from './Graph/ExecuteGraph.jsx';
import Graph from './Graph/Graph.js';

function HomeScreen(){
    const [activeComponent, setActiveComponent] = useState('HomeScreen');

    const toBNS = () => {
        setActiveComponent('executeBNS');
    };

    const toQS = () => {
        setActiveComponent('executeQS');
    };

    const toGraph = () => {
        setActiveComponent('executeGraph');
    };

    const toHome = () => {
        setActiveComponent('HomeScreen');
    };

    const myGraph = new Graph(0); // Assuming 5 is the size of the graph
    
    return(
        <div>
            {activeComponent === "HomeScreen" ? (
                <div>
                    <div className="card_container">
                        <Card onClick={toBNS} image={bns} title="Binary Search" text="Binary search is an efficient algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half."/>
                        <Card onClick={toQS} image={qs} title="Quick Sort" text="Quick sort is an efficient, recursive divide-and-conquer algorithm that selects a pivot element to partition the array into sub-arrays, then sorts the sub-arrays independently."/>
                        <Card onClick={toGraph} image={graph} title="Graph" text="Graphs are data structures that represent relationships between pairs of objects, consisting of vertices (or nodes) connected by edges."/>
                    </div>
                    <div className="title">
                        <h1 style={{ fontSize: '76px'}}>Algorithm Visualizer</h1>
                    </div>
                    

                </div>
                
                
            ) : ( activeComponent === "executeBNS" ? (
                <div>
                    <div className="backToHome">
                        <button onClick={toHome}>Home</button>
                    </div>
                
                    <ExecuteBNS />
                </div>
            ) : ( activeComponent === "executeQS" ? (
                <div>
                    <div className="backToHome">
                        <button onClick={toHome}>Home</button>
                    </div>
                
                    <ExecuteQS />
                </div>
            ) : (
                <div>
                    <div className="backToHome">
                        <button onClick={toHome}>Home</button>
                    </div>

                    <GraphComponent graph={myGraph}/>
                </div>
            )))}
            
        </div>
        
    );
}

export default HomeScreen;
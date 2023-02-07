import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import Canvas from './Canvas';

function Main() {
    return (        
        <>
        <Navbar/>
        <Canvas/>
        </>
    );
}
export default Main;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <Main/>
        </React.StrictMode>
    )
}

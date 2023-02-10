import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import Download from './Download';
import Footer from './Footer';

function App() {
    return (        
        <>
        <Navbar />
        <main>
        <div className="container-fluid" style={{height: '80vh'}}>
            <div className="row h-100">
                <Toolbar />
                <Canvas />
                <Download />
            </div>
        </div>
        </main>
        <Footer />
        </>
    );
}
export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}

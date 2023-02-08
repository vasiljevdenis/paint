import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import Canvas from './Canvas';
import Preview from './Preview';
import Footer from './Footer';

function App() {
    return (        
        <>
        <Navbar />
        <Preview />
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

import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

const render = () => {
    const container = document.getElementById('container');
    const root = createRoot(container);
    root.render(<App />);
};

// const render = () => {
//     ReactDOM.render(<App />, document.getElementById('container'));
// };

Office.onReady(() => {
    render();
});

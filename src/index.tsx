import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './app/logic/utils/consoleRedefine';

console.log('initializing index tsx');
const render = () => {
    const container = document.getElementById('container');
    const root = createRoot(container);
    root.render(<App />);
};

Office.onReady(() => {
    render();
});

Office.initialize = function () {};

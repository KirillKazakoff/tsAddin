import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = () => {
    ReactDOM.render(<App />, document.getElementById('container'));
};

Office.onReady(() => {
    render();
});

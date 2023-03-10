import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/utils/App';

const render = () => {
    ReactDOM.render(<App />, document.getElementById('container'));
};

Office.onReady(() => {
    render();
});

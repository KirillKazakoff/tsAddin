import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LetterRoute } from './routes/LetterRoute';
import MainRoute from './routes/MainRoute';

export default function RouteApp() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={MainRoute} />
                <Route path='/letter' element={LetterRoute} />
            </Routes>
        </Router>
    );
}

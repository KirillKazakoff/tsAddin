import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LetterRoute } from './routes/LetterRoute/LetterRoute';
import { MainRoute } from './routes/MainRoute';
import ErrorLetter from './routes/ErrorRoute/ErrorLetter';

export default function RouteApp() {
    console.log('he');
    return (
        <Router>
            <Routes>
                <Route path='*' element={<MainRoute />} />
                <Route path='/letter' element={<LetterRoute />} />
                <Route path='/errorLetter' element={<ErrorLetter />} />
            </Routes>
        </Router>
    );
}

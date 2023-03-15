import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LetterRoute } from './app/routes/LetterRoute/LetterRoute';
import { MainRoute } from './app/routes/MainRoute';
import ErrorLetter from './app/routes/ErrorRoute/ErrorLetter';
import NavigatorRoute from './app/routes/NavigatorRoute';
import { DocsRoute } from './app/routes/DocsRoute/DocsRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<NavigatorRoute />} />
                <Route path='/' element={<MainRoute />}>
                    <Route path='/letter' element={<LetterRoute />} />
                    <Route path='/docs' element={<DocsRoute />} />
                </Route>
                <Route path='/errorLetter' element={<ErrorLetter />} />
            </Routes>
        </Router>
    );
}

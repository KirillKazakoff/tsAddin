import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LetterRoute } from '../routes/LetterRoute/LetterRoute';
import { MainRoute } from '../routes/MainRoute';
import ErrorLetter from '../routes/ErrorRoute/ErrorLetter';
import NavigatorRoute from '../routes/NavigatorRoute';
import { DocsRoute } from '../routes/DocsRoute/DocsRoute';

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

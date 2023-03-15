import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LetterRoute } from './app/routes/LetterRoute/LetterRoute';
import { MainRoute } from './app/routes/MainRoute';
import NavigatorRoute from './app/routes/NavigatorRoute';
import { DocsRoute } from './app/routes/DocsRoute/DocsRoute';
import PageStatusRoute from './app/routes/ErrorRoute/PageStatusRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<NavigatorRoute />} />
                <Route path='/' element={<MainRoute />}>
                    <Route path='/letter' element={<LetterRoute />} />
                    <Route path='/docs' element={<DocsRoute />} />
                </Route>
                <Route path='/pageStatus' element={<PageStatusRoute />} />
            </Routes>
        </Router>
    );
}

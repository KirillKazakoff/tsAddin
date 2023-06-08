import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LetterRoute } from './app/routes/LetterRoute/LetterRoute';
import { MainRoute } from './app/routes/MainRoute';
import NavigatorRoute from './app/routes/NavigatorRoute';
import { PageStatusRoute } from './app/routes/ErrorRoute/PageStatusRoute';
import { ExportRoute } from './app/routes/ExportRoute/ExportRoute';
import { InnerRoute } from './app/routes/InnerRoute/InnerRoute';
import { NordmileRoute } from './app/routes/NordmileRoute/NordmileRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<NavigatorRoute />} />
                <Route path='/' element={<MainRoute />}>
                    <Route path='/export' element={<ExportRoute />} />
                    <Route path='/inner' element={<InnerRoute />} />
                    <Route path='/letter' element={<LetterRoute />} />
                    <Route path='/nordmile' element={<NordmileRoute />} />
                </Route>
                <Route path='/pageStatus' element={<PageStatusRoute />} />
            </Routes>
        </Router>
    );
}

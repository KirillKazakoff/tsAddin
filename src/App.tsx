import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LetterRoute } from './app/routes/LetterRoute/LetterRoute';
import { MainRoute } from './app/routes/MainRoute';
import NavigatorRoute from './app/routes/NavigatorRoute';
import { PageStatusRoute } from './app/routes/ErrorRoute/PageStatusRoute';
import { ExportRoute } from './app/routes/ExportRoute/ExportRoute';
import { InnerRoute } from './app/routes/InnerRoute/InnerRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<NavigatorRoute />} />
                <Route path='/' element={<MainRoute />}>
                    <Route path='/letter' element={<LetterRoute />} />
                    <Route path='/export' element={<ExportRoute />} />
                    <Route path='/inner' element={<InnerRoute />} />
                </Route>
                <Route path='/pageStatus' element={<PageStatusRoute />} />
            </Routes>
        </Router>
    );
}

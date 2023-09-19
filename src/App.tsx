import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LetterRoute } from './app/routes/LetterRoute/LetterRoute';
import { LinkRoute } from './app/routes/LinkRoute';
import NavigatorRoute from './app/routes/NavigatorRoute';
import { PageStatusRoute } from './app/routes/ErrorRoute/PageStatusRoute';
import { ExportRoute } from './app/routes/ExportRoute/ExportRoute';
import { InnerRoute } from './app/routes/InnerRoute/InnerRoute';
import { RequestNordmileRoute } from './app/routes/RequestNordmileRoute';
import { SalesRoute } from './app/routes/SalesRoute/SalesRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<NavigatorRoute />} />
                <Route path='/' element={<LinkRoute />}>
                    <Route path='/export' element={<ExportRoute />} />
                    <Route path='/inner' element={<InnerRoute />} />
                    <Route path='/letter' element={<LetterRoute />} />
                    <Route path='/request' element={<RequestNordmileRoute />} />
                    <Route path='/pageStatus' element={<PageStatusRoute />} />
                    <Route path='/sales' element={<SalesRoute />} />
                </Route>
            </Routes>
        </Router>
    );
}

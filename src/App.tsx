import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OfferRoute } from './app/routes/OfferRoute/OfferRoute';
import { LinkRoute } from './app/routes/LinkRoute';
import NavigatorRoute from './app/routes/NavigatorRoute';
import { PageStatusRoute } from './app/routes/ErrorRoute/PageStatusRoute';
import { ExportRoute } from './app/routes/ExportRoute/ExportRoute';
import { InnerRoute } from './app/routes/InnerRoute/InnerRoute';
import { SalesRoute } from './app/routes/SalesRoute';
import { DTRoute } from './app/routes/DTRoute/DTRoute';
import { BhgDTRoute } from './app/routes/BuhDTRoute/BhgDTRoute';
import { TranslatorRoute } from './app/routes/TranslatorRoute/TranslatorRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<NavigatorRoute />} />
                <Route path='/' element={<LinkRoute />}>
                    <Route path='/export' element={<ExportRoute />} />
                    <Route path='/inner' element={<InnerRoute />} />
                    <Route path='/letter' element={<OfferRoute />} />
                    <Route path='/pageStatus' element={<PageStatusRoute />} />
                    <Route path='/sales' element={<SalesRoute />} />
                    <Route path='/dt' element={<DTRoute />} />
                    <Route path='/dtLetter' element={<BhgDTRoute />} />
                    <Route path='/translator' element={<TranslatorRoute />} />
                </Route>
            </Routes>
        </Router>
    );
}

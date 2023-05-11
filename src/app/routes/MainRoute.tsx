import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import excelSyncStore from '../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../stores/pageStatusStore.ts/pageStatusStore';

export const MainRoute = observer(() => {
    const { statusType } = pageStatusStore.status;
    const navigate = useNavigate();

    useEffect(() => {
        if (statusType !== 'ok') {
            navigate('/pageStatus');
        }
    }, [statusType, navigate]);

    const Offer = () => (
        <NavLink to={'/letter'} className='nav-link'>
            Предложение
        </NavLink>
    );

    const Docs = () => (
        <>
            <NavLink to={'/export'} className='nav-link'>
                Экспорт
            </NavLink>
            <NavLink to={'/inner'} className='nav-link'>
                Внутренний рынок
            </NavLink>
        </>
    );

    return (
        <div className='main-route'>
            <nav className='nav'>
                {excelSyncStore.appStatus === 'Docs' ? <Docs /> : <Offer />}
            </nav>
            <Outlet />
        </div>
    );
});

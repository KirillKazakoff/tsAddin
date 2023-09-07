import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import excelSyncStore from '../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../stores/pageStatusStore.ts/pageStatusStore';
import { useInitExcel } from '../logic/excel/useInitExcel';
import { CheckBoxValidation } from '../components/CheckBoxValidation';

export const LinkRoute = observer(() => {
    const { statusType } = pageStatusStore.status;
    const navigate = useNavigate();
    useInitExcel();

    useEffect(() => {
        if (statusType !== 'ok') {
            navigate('/pageStatus');
        }
    }, [statusType, navigate]);

    const Offer = () => (
        <>
            <NavLink to={'/letter'} className='nav-link'>
                Предложение
            </NavLink>
            <NavLink to={'/request'} className='nav-link'>
                Заявки
            </NavLink>
        </>
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

    if (statusType !== 'ok') return <Outlet />;
    return (
        <div className='main-route'>
            <nav className='nav'>
                {excelSyncStore.appStatus === 'Docs' ? <Docs /> : <Offer />}
            </nav>

            <Outlet />
            <CheckBoxValidation />
        </div>
    );
});

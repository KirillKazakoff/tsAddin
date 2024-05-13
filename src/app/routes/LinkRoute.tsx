import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import excelSyncStore from '../stores/excelSyncStore.ts/excelSyncStore';
import pageStatusStore from '../stores/pageStatusStore.ts/pageStatusStore';
import { useInitExcel } from '../logic/excel/useInitExcel';
import { CheckBoxValidation } from '../components/CheckBox/CheckBoxValidation';
import { Popup } from '../components/Notification/Popup';
import { NotificationBtn } from '../components/Notification/NotificationBtn';

export const LinkRoute = observer(() => {
    const { statusType } = pageStatusStore.status;
    const { appStatus } = excelSyncStore;
    const navigate = useNavigate();
    useInitExcel();

    useEffect(() => {
        if (statusType !== 'ok') {
            navigate('/pageStatus');
        }
    }, [statusType, navigate]);

    const Links = () => {
        if (appStatus === 'Offer') {
            return (
                <>
                    <NavLink to={'/letter'} className='nav-link'>
                        Предложение
                    </NavLink>
                    <NavLink to={'/request'} className='nav-link'>
                        Заявки
                    </NavLink>
                </>
            );
        }
        if (appStatus === 'Sales') {
            return (
                <NavLink to={'/sales'} className={'nav-link'}>
                    Продажи
                </NavLink>
            );
        }
        if (appStatus === 'DT') {
            return (
                <NavLink to={'/dt'} className={'nav-link'}>
                    ДТ
                </NavLink>
            );
        }

        if (appStatus === 'Docs') {
            return (
                <>
                    <NavLink to={'/export'} className='nav-link'>
                        Экспорт
                    </NavLink>
                    <NavLink to={'/inner'} className='nav-link'>
                        Внутренний рынок
                    </NavLink>
                </>
            );
        }
        return <div>Initializing app...</div>;
    };

    if (statusType !== 'ok') return <Outlet />;
    return (
        <div className='main-route'>
            <nav className='nav'>
                <Links />
                <NotificationBtn />
            </nav>

            <Outlet />
            <CheckBoxValidation />
            <Popup />
        </div>
    );
});

import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import pageStatusStore from '../stores/pageStatusStore';

export const MainRoute = observer(() => {
    const { isLetterError } = pageStatusStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLetterError) {
            navigate('/errorLetter');
        }
    }, [isLetterError, navigate]);

    return (
        <div className='main-route'>
            <nav className='nav'>
                <NavLink to={'/letter'} className='nav-link'>
                    Offer
                </NavLink>
                <NavLink to={'/docs'} className='nav-link'>
                    Docs
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
});

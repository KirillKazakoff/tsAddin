import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pageStatusStore from '../stores/pageStatusStore';

export const MainRoute = observer(() => {
    const navigate = useNavigate();
    const { isLetterError } = pageStatusStore;

    useEffect(() => {
        if (isLetterError) {
            navigate('/errorLetter');
            return;
        }
        navigate('/letter');
    });

    return (
        <div>
            <div className='main-route'>MainRoute</div>
        </div>
    );
});

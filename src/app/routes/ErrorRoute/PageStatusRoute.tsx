import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ErrorBtn from './ErrorBtn';
import Error from './Error';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';

export const PageStatusRoute = observer(() => {
    const { desc, title, statusType } = pageStatusStore.status;
    const navigate = useNavigate();
    const onClick = () => {
        pageStatusStore.resetPageStatus();
        navigate(-1);
    };

    useEffect(() => {
        console.log('hey');

        if (statusType === 'ok') {
            navigate(-1);
        }
    }, [statusType, navigate]);

    return (
        <Error title={title} desc={desc}>
            <ErrorBtn onClick={onClick} desc='Вернуться назад' />
        </Error>
    );
});

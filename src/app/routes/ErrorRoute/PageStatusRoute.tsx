import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBtn from './ErrorBtn';
import Error from './Error';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';

export default function PageStatusRoute() {
    const { desc, title } = pageStatusStore.status;
    const navigate = useNavigate();
    const onClick = () => {
        pageStatusStore.resetPageStatus();
        navigate(-1);
    };

    return (
        <Error title={title} desc={desc}>
            <ErrorBtn onClick={onClick} desc='Get back' />
        </Error>
    );
}

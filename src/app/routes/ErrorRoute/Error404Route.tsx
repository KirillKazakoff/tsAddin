import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBtn from './ErrorBtn';
import Error from './Error';
import pageStatusStore from '../../stores/pageStatusStore';

export default function Error404Route() {
    const navigate = useNavigate();
    const onClick = () => {
        pageStatusStore.setLetterStatus(false);
        navigate(-1);
    };

    return (
        <Error title='Пустые строчки' desc='Строчки в табличке пустые уберите...'>
            <ErrorBtn onClick={onClick} desc='Get back' />
        </Error>
    );
}

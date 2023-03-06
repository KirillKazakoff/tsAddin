import React from 'react';
import { useNavigate } from 'react-router-dom';
import pageStatusStore from '../../stores/pageStatusStore';
import Error from './Error';
import ErrorBtn from './ErrorBtn';

export default function ErrorLetter() {
    const navigate = useNavigate();
    const onClick = () => {
        pageStatusStore.setLetterStatus(false);
        navigate('/letter');
    };

    return (
        <Error
            title='В таблице ошибка'
            desc='Проверьте таблицу, заполните пустые ячейки либо удалите пустые строки'
        >
            <ErrorBtn onClick={onClick} desc='Get back' />
        </Error>
    );
}

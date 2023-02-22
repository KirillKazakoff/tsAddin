import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { useGetHref } from '../../letter/getHref';
import { useInitLetter } from '../../letter/useInitLetter';

export const LetterRoute = observer(() => {
    const initLetter = useInitLetter();
    const getHref = useGetHref();

    const [dateArrival, setDateArrival] = useState('');
    const [port, setPort] = useState('');
    const [datePayment, setDatePayment] = useState('');

    useEffect(() => {
        initLetter();
    }, []);

    const onClick = () => {
        const href = getHref(dateArrival, datePayment, port);
        document.location.href = href;
    };

    return (
        <div>
            <form className='form form-letter'>
                <Input
                    placeholder='Дата прибытия'
                    setter={setDateArrival}
                    value={dateArrival}
                />
                <Input
                    placeholder='Порт' setter={setPort}
                    value={port}
                />
                <Input
                    placeholder='Дата оплаты'
                    setter={setDatePayment}
                    value={datePayment}
                />

                <button
                    type='button' onClick={onClick}
                    className='btn'
                >
                    Создать письмо
                </button>
            </form>
        </div>
    );
});

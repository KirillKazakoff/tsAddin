import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import { useGetHref } from '../../letter/getHref';
import { useInitLetter } from '../../letter/init/useInitLetter';
import letterStore from '../../stores/letterStore';

export const LetterRoute = observer(() => {
    const initLetter = useInitLetter();
    const getHref = useGetHref();

    const [dateArrival, setDateArrival] = useState('');
    const [port, setPort] = useState('');
    const [datePayment, setDatePayment] = useState('');

    useEffect(() => {
        const func = async () => {
            await initLetter();
        };
        func();
    });

    const onClick = async () => {
        await initLetter();
        const href = getHref(dateArrival, datePayment, port);
        document.location.href = href;
    };

    const setOperation = (value: string) => {
        letterStore.setOperation(value);
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
                <Input
                    placeholder='Операция'
                    setter={setOperation}
                    value={letterStore.letter.operation}
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

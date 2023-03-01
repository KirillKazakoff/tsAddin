import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Input from '../../components/Input';
import { getHref } from '../../letter/getHref';
import { useInitLetter } from '../../letter/init/useInitLetter';
import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';

export const LetterRoute = observer(() => {
    const { fields } = letterFieldsStore;
    const initLetter = useInitLetter();

    useEffect(() => {
        const func = async () => {
            await initLetter();
        };
        func();
    });

    const onClick = async () => {
        await initLetter();
        const href = getHref();
        document.location.href = href;
    };

    const setOperation = (operation: string) => {
        letterFieldsStore.setOperation(operation);
    };

    const setDateArrival = (date: string) => {
        letterFieldsStore.setDateArrival(date);
    };

    const setDatePayment = (date: string) => {
        letterFieldsStore.setDatePayment(date);
    };

    const setPort = (port: string) => {
        letterFieldsStore.setPort(port);
    };

    return (
        <div>
            <form className='form form-letter'>
                <Input
                    placeholder='Дата прибытия'
                    setter={setDateArrival}
                    value={fields.dateArrival}
                />
                <Input
                    placeholder='Порт' setter={setPort}
                    value={fields.port}
                />
                <Input
                    placeholder='Дата оплаты'
                    setter={setDatePayment}
                    value={fields.datePayment}
                />
                <Input
                    placeholder='Операция'
                    setter={setOperation}
                    value={fields.operation}
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

import { observer } from 'mobx-react-lite';
import React from 'react';
import Input from '../../components/Input';
import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';

export const MainFields = observer(() => {
    const { fields } = letterFieldsStore;

    const setOperation = (operation: string) => {
        letterFieldsStore.setOperation(operation);
    };

    const setDateArrival = (date: string) => {
        letterFieldsStore.setArrivalVld(date);
    };

    const setDatePayment = (date: string) => {
        letterFieldsStore.setPayment(date);
    };

    const setPort = (port: string) => {
        letterFieldsStore.setPort(port);
    };

    return (
        <div className='letter__fields'>
            <Input
                title='ETA Владивосток'
                placeholder='ETA Владивосток'
                setter={setDateArrival}
                value={fields.arrivalVld}
            />
            <Input
                title='Порт'
                placeholder='Порт'
                setter={setPort}
                value={fields.port}
            />
            <Input
                title='Дата оплаты'
                placeholder='Дата оплаты'
                setter={setDatePayment}
                value={fields.payment}
            />
            <Input
                title='Операция'
                placeholder='Операция'
                setter={setOperation}
                value={fields.operation}
            />
        </div>
    );
});

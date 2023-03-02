import { observer } from 'mobx-react-lite';
import React from 'react';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';

export const MainFields = observer(() => {
    const { fields } = letterFieldsStore;

    const toggleIsExport = () => {
        letterFieldsStore.toggleIsExport();
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
            <CheckBox
                type='checkbox'
                title='Предложение на экспорт'
                placeholder='Предложение на экспорт'
                setter={toggleIsExport}
                checked={fields.isExport}
            />
        </div>
    );
});

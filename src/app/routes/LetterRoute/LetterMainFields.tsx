import { observer } from 'mobx-react-lite';
import React from 'react';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import letterStore from '../../stores/letterStore/letterStore';

export const LetterMainFields = observer(() => {
    const { fields } = letterStore;

    const toggleIsExport = () => {
        letterStore.toggleIsExport();
    };

    const setDateArrival = (date: string) => {
        letterStore.setArrivalVld(date);
    };

    const setDatePayment = (date: string) => {
        letterStore.setPayment(date);
    };

    const setPort = (port: string) => {
        letterStore.setPort(port);
    };

    return (
        <div className='letter__fields'>
            <img
                src='https://kirillkazakoff.github.io/tsAddin/assets/icon-16.png'
                alt='icon-16.png'
            />
            <Input
                title='ETA Владивосток'
                placeholder='ETA Владивосток'
                setter={setDateArrival}
                value={fields.arrivalVld}
                required
            />
            <Input
                title='Порт'
                placeholder='Порт'
                setter={setPort}
                value={fields.port}
                required
            />
            <Input
                title='Дата оплаты'
                placeholder='Дата оплаты'
                setter={setDatePayment}
                value={fields.payment}
            />
            <CheckBox
                title='Предложение на экспорт'
                setter={toggleIsExport}
                checked={fields.isExport}
            />
        </div>
    );
});

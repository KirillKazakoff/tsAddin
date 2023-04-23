import { observer } from 'mobx-react-lite';
import React from 'react';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import letterStore from '../../stores/letterStore/letterStore';

export const LetterMainFields = observer(() => {
    const { fields, setField } = letterStore;

    return (
        <div className='letter__fields'>
            <Input
                title='ETA Владивосток'
                placeholder='ETA Владивосток'
                setter={setField.arrivalVld}
                value={fields.arrivalVld}
                required
            />
            <Input
                title='Порт'
                placeholder='Порт'
                setter={setField.port}
                value={fields.port}
                required
            />
            <Input
                title='Дата оплаты'
                placeholder='Дата оплаты'
                setter={setField.payment}
                value={fields.payment}
            />
            <CheckBox
                title='Предложение на экспорт'
                setter={letterStore.toggleIsExport}
                checked={fields.isExport}
            />
        </div>
    );
});

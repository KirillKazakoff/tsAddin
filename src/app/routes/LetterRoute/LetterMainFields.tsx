import { observer } from 'mobx-react-lite';
import React from 'react';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPortZarubezh } from '../../components/Select/SelectPortZarubezh';
import letterStore from '../../stores/letterStore/letterStore';

export const LetterMainFields = observer(() => {
    const { fields, setField } = letterStore;
    const SelectPort = fields.isExport ? SelectPortZarubezh : SelectPortRu;

    return (
        <div className='letter__fields'>
            <Input
                title='ETA Владивосток'
                placeholder='ETA Владивосток'
                setter={setField.arrivalVld}
                value={fields.arrivalVld}
                required
            />
            <SelectPort current={fields.port.codeName} setter={setField.port} />
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

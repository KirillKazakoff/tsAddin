import React from 'react';
import { observer } from 'mobx-react-lite';
import letterStore from '../../stores/letterStore/letterStore';
import Input from '../../components/Input';
import SelectTerms from '../../components/Select/SelectTerms';

export const LetterExportFields = observer(() => {
    const { fields, setField } = letterStore;

    if (!fields.isExport) return null;

    return (
        <div className='letter__fields letter__fields--export'>
            <Input
                title='ETA экспорт'
                placeholder={`ETA ${fields.port}`}
                setter={setField.arrivalForeign}
                value={fields.arrivalForeign}
            />
            <SelectTerms
                current={fields.terms}
                setter={setField.terms}
                title={'Условия продажи'}
            />
            <Input
                title='Фишинг земля'
                placeholder='Fishing ground'
                setter={setField.ground}
                value={fields.ground}
            />
        </div>
    );
});

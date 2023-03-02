import React from 'react';
import { observer } from 'mobx-react-lite';
import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';
import Input from '../../components/Input';

export const ExportFields = observer(() => {
    const { fields } = letterFieldsStore;

    const setTerms = (terms: string) => {
        letterFieldsStore.setTerms(terms);
    };
    const setGround = (ground: string) => {
        letterFieldsStore.setGround(ground);
    };
    const setDateForeignArrival = (date: string) => {
        letterFieldsStore.setArrivalForeign(date);
    };

    if (!fields.isExport) return null;

    return (
        <div className='letter__fields letter__fields--export'>
            <Input
                title='ETA экспорт'
                placeholder={`ETA ${fields.port}`}
                setter={setDateForeignArrival}
                value={fields.arrivalForeign}
            />
            <Input
                title='Условия продажи'
                placeholder='Условия продажи'
                setter={setTerms}
                value={fields.terms}
            />
            <Input
                title='Фишинг земля'
                placeholder='Fishing ground'
                setter={setGround}
                value={fields.ground}
            />
        </div>
    );
});

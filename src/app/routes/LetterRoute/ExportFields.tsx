import React from 'react';
import { observer } from 'mobx-react-lite';
import letterStore from '../../stores/letterStore/letterStore';
import Input from '../../components/Input';

export const ExportFields = observer(() => {
    const { fields } = letterStore;

    const setTerms = (terms: string) => {
        letterStore.setTerms(terms);
    };
    const setGround = (ground: string) => {
        letterStore.setGround(ground);
    };
    const setDateForeignArrival = (date: string) => {
        letterStore.setArrivalForeign(date);
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

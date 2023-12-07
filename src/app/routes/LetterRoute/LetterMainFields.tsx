/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPortZarubezh } from '../../components/Select/SelectPortZarubezh';
import InputText from '../../components/Form/InputText';
import CheckBox from '../../components/CheckBox';

export const LetterMainFields = observer(() => {
    const context = useFormikContext<{
        port: string;
        isExport: boolean;
        terms: string;
    }>();
    const SelectPort = context.values.isExport ? SelectPortZarubezh : SelectPortRu;

    useEffect(() => {
        context.setFieldValue('port', '');
    }, [context.values.isExport]);

    if (context.values.terms === 'EXW') {
        return (
            <div className='fields-wrapper'>
                <SelectPort name='port' />
            </div>
        );
    }

    return (
        <div className='fields-wrapper'>
            <CheckBox
                wrapperCls='letter__checkbox'
                title='Предложение на экспорт:'
                name='isExport'
            />
            <InputText
                title={context.values.isExport ? 'ETD Владивосток' : 'ETA Владивосток'}
                placeholder={context.values.isExport ? 'Дата отбытия' : 'Дата прибытия'}
                name='arrivalVld'
            />
            <SelectPort name='port' />
            <InputText
                title='Дата оплаты' placeholder='Дата оплаты'
                name='payment'
            />
        </div>
    );
});
